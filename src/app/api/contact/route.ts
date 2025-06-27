import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'

// Contact form validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
})

// Create Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // Your email
      pass: process.env.SMTP_PASS, // Your email password or app password
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = contactSchema.parse(body)
    
    // Check if SMTP configuration is available
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Contact form submission (SMTP not configured):', validatedData)
      return NextResponse.json(
        { 
          message: 'Thank you for your message! I\'ll get back to you soon.',
          success: true 
        },
        { status: 200 }
      )
    }

    // Create transporter
    const transporter = createTransporter()

    // Email content for you (to receive the message)
    const adminEmailOptions = {
      from: `"${validatedData.firstName} ${validatedData.lastName}" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `Portfolio Contact: ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 3px solid #4F46E5; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #4F46E5; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
            <p><strong>Email:</strong> <a href="mailto:${validatedData.email}" style="color: #4F46E5;">${validatedData.email}</a></p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #4F46E5; margin-top: 0;">Message</h3>
            <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #4F46E5; border-radius: 4px;">
              ${validatedData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #e7f3ff; border-radius: 8px;">
            <p style="margin: 0; color: #0066cc; font-size: 14px;">
              <strong>💡 Tip:</strong> Reply directly to this email to respond to ${validatedData.firstName}.
            </p>
          </div>
        </div>
      `,
      replyTo: validatedData.email,
    }

    // Send admin notification email
    await transporter.sendMail(adminEmailOptions)

    console.log('Contact form email sent successfully:', {
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      from: validatedData.email,
      subject: validatedData.subject
    })
    
    return NextResponse.json(
      { 
        message: 'Thank you for your message! I\'ll get back to you soon.',
        success: true 
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Contact form error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: 'Please check your form data and try again.',
          errors: error.errors,
          success: false 
        },
        { status: 400 }
      )
    }
    
    // Handle specific Nodemailer errors
    if (error && typeof error === 'object' && 'code' in error) {
      const emailError = error as { code: string; response?: string }
      
      if (emailError.code === 'EAUTH') {
        console.error('SMTP Authentication failed')
        return NextResponse.json(
          { 
            message: 'Email service configuration error. Please try again later.',
            success: false 
          },
          { status: 500 }
        )
      }
      
      if (emailError.code === 'ECONNECTION') {
        console.error('SMTP Connection failed')
        return NextResponse.json(
          { 
            message: 'Unable to connect to email service. Please try again later.',
            success: false 
          },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json(
      { 
        message: 'Something went wrong. Please try again later.',
        success: false 
      },
      { status: 500 }
    )
  }
}
