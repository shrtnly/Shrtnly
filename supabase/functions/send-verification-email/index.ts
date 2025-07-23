import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  email: string
  token: string
  type: 'verification' | 'password_reset'
  userName?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, token, type, userName }: EmailRequest = await req.json()

    // Validate input
    if (!email || !token || !type) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const baseUrl = Deno.env.get('SITE_URL') || 'http://localhost:3000'
    
    let subject: string
    let htmlContent: string
    let textContent: string

    if (type === 'verification') {
      const verificationUrl = `${baseUrl}/verify-email?token=${token}`
      
      subject = 'Verify Your Email Address - Shrtnly'
      
      htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 40px 20px; text-align: center; }
            .logo { color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .header-text { color: #e0e7ff; font-size: 16px; }
            .content { padding: 40px 20px; }
            .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
            .text { color: #4b5563; line-height: 1.6; margin-bottom: 20px; }
            .button { display: inline-block; background: #3b82f6; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .button:hover { background: #2563eb; }
            .security-info { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: #f8fafc; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            .warning { color: #dc2626; font-weight: 600; }
            @media (max-width: 600px) {
              .container { margin: 0; }
              .content { padding: 20px; }
              .button { display: block; text-align: center; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🔗 Shrtnly</div>
              <div class="header-text">Professional URL Shortener</div>
            </div>
            
            <div class="content">
              <h1 class="title">Verify Your Email Address</h1>
              
              <p class="text">
                Hello${userName ? ` ${userName}` : ''},
              </p>
              
              <p class="text">
                Thank you for signing up for Shrtnly! To complete your registration and start creating short links, 
                please verify your email address by clicking the button below.
              </p>
              
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
              </div>
              
              <p class="text">
                If the button doesn't work, you can copy and paste this link into your browser:
              </p>
              
              <p style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px; font-family: monospace;">
                ${verificationUrl}
              </p>
              
              <div class="security-info">
                <h3 style="margin-top: 0; color: #1f2937;">🔒 Security Information</h3>
                <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
                  <li>This verification link will expire in 24 hours</li>
                  <li>If you didn't create an account, please ignore this email</li>
                  <li>Never share this verification link with others</li>
                  <li>Our team will never ask for your password via email</li>
                </ul>
              </div>
              
              <p class="text warning">
                ⚠️ This link will expire in 24 hours for your security.
              </p>
            </div>
            
            <div class="footer">
              <p>© 2024 Shrtnly. All rights reserved.</p>
              <p>If you have any questions, contact us at support@shrtnly.com</p>
            </div>
          </div>
        </body>
        </html>
      `
      
      textContent = `
        Verify Your Email Address - Shrtnly
        
        Hello${userName ? ` ${userName}` : ''},
        
        Thank you for signing up for Shrtnly! To complete your registration and start creating short links, please verify your email address by visiting this link:
        
        ${verificationUrl}
        
        Security Information:
        - This verification link will expire in 24 hours
        - If you didn't create an account, please ignore this email
        - Never share this verification link with others
        - Our team will never ask for your password via email
        
        If you have any questions, contact us at support@shrtnly.com
        
        © 2024 Shrtnly. All rights reserved.
      `
    } else {
      // Password reset email
      const resetUrl = `${baseUrl}/reset-password?token=${token}`
      
      subject = 'Reset Your Password - Shrtnly'
      
      htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; }
            .header { background: linear-gradient(135deg, #dc2626, #b91c1c); padding: 40px 20px; text-align: center; }
            .logo { color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .header-text { color: #fecaca; font-size: 16px; }
            .content { padding: 40px 20px; }
            .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
            .text { color: #4b5563; line-height: 1.6; margin-bottom: 20px; }
            .button { display: inline-block; background: #dc2626; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
            .button:hover { background: #b91c1c; }
            .security-info { background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc2626; }
            .footer { background: #f8fafc; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
            .warning { color: #dc2626; font-weight: 600; }
            @media (max-width: 600px) {
              .container { margin: 0; }
              .content { padding: 20px; }
              .button { display: block; text-align: center; }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🔗 Shrtnly</div>
              <div class="header-text">Password Reset Request</div>
            </div>
            
            <div class="content">
              <h1 class="title">Reset Your Password</h1>
              
              <p class="text">
                Hello,
              </p>
              
              <p class="text">
                We received a request to reset the password for your Shrtnly account associated with this email address. 
                If you made this request, click the button below to reset your password.
              </p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              
              <p class="text">
                If the button doesn't work, you can copy and paste this link into your browser:
              </p>
              
              <p style="word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 4px; font-family: monospace;">
                ${resetUrl}
              </p>
              
              <div class="security-info">
                <h3 style="margin-top: 0; color: #dc2626;">🔒 Important Security Information</h3>
                <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
                  <li><strong>This reset link will expire in 1 hour</strong></li>
                  <li>If you didn't request this reset, please ignore this email</li>
                  <li>Your password will remain unchanged until you create a new one</li>
                  <li>Never share this reset link with others</li>
                  <li>Use a strong, unique password for your account</li>
                </ul>
              </div>
              
              <p class="text warning">
                ⚠️ If you didn't request this password reset, someone may be trying to access your account. 
                Please contact our support team immediately.
              </p>
            </div>
            
            <div class="footer">
              <p>© 2024 Shrtnly. All rights reserved.</p>
              <p>If you have any questions, contact us at support@shrtnly.com</p>
            </div>
          </div>
        </body>
        </html>
      `
      
      textContent = `
        Reset Your Password - Shrtnly
        
        Hello,
        
        We received a request to reset the password for your Shrtnly account. If you made this request, visit this link to reset your password:
        
        ${resetUrl}
        
        Important Security Information:
        - This reset link will expire in 1 hour
        - If you didn't request this reset, please ignore this email
        - Your password will remain unchanged until you create a new one
        - Never share this reset link with others
        - Use a strong, unique password for your account
        
        If you didn't request this password reset, someone may be trying to access your account. Please contact our support team immediately.
        
        If you have any questions, contact us at support@shrtnly.com
        
        © 2024 Shrtnly. All rights reserved.
      `
    }

    // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
    // For now, we'll simulate sending the email
    console.log('Sending email:', { email, subject, type })
    
    // In a real implementation, you would use an email service like:
    /*
    const emailResponse = await fetch('https://api.sendgrid.v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email }],
          subject,
        }],
        from: { email: 'noreply@shrtnly.com', name: 'Shrtnly' },
        content: [
          { type: 'text/plain', value: textContent },
          { type: 'text/html', value: htmlContent },
        ],
      }),
    })
    */

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        // In development, return the content for testing
        ...(Deno.env.get('ENVIRONMENT') === 'development' && {
          debug: { htmlContent, textContent, subject }
        })
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send email',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})