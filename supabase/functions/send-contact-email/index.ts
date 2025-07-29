import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactRequest {
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  to: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, company, subject, message, to }: ContactRequest = await req.json()

    // Validate input
    if (!name || !email || !subject || !message || !to) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/New_York'
    })

    const subjectMap: Record<string, string> = {
      'enterprise': 'Enterprise Solutions Inquiry',
      'api': 'API Integration Support Request',
      'analytics': 'Analytics & Reporting Question',
      'custom-domain': 'Custom Domain Setup Request',
      'billing': 'Billing & Pricing Inquiry',
      'technical': 'Technical Support Request',
      'partnership': 'Partnership Opportunity',
      'general': 'General Inquiry'
    }

    const emailSubject = `Shrtnly Contact Form: ${subjectMap[subject] || 'New Inquiry'} - ${name}`
    
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; }
          .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 40px 20px; text-align: center; }
          .logo { color: white; font-size: 28px; font-weight: bold; margin-bottom: 10px; }
          .header-text { color: #e0e7ff; font-size: 16px; }
          .content { padding: 40px 20px; }
          .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 20px; }
          .field { margin-bottom: 20px; }
          .field-label { font-weight: 600; color: #374151; margin-bottom: 5px; }
          .field-value { color: #4b5563; background: #f9fafb; padding: 10px; border-radius: 6px; border-left: 4px solid #3b82f6; }
          .message-box { background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
          .priority { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .priority-high { background: #dc2626; color: white; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🔗 Shrtnly</div>
            <div class="header-text">Contact Form Submission</div>
          </div>
          
          <div class="content">
            <h1 class="title">New Contact Form Submission</h1>
            
            ${subject === 'enterprise' || subject === 'technical' ? 
              '<div class="priority"><span class="priority-high">HIGH PRIORITY</span> This inquiry requires immediate attention from the appropriate team.</div>' : 
              ''
            }
            
            <div class="field">
              <div class="field-label">Contact Information:</div>
              <div class="field-value">
                <strong>Name:</strong> ${name}<br>
                <strong>Email:</strong> ${email}<br>
                ${phone ? `<strong>Phone:</strong> ${phone}<br>` : ''}
                ${company ? `<strong>Company:</strong> ${company}<br>` : ''}
                <strong>Inquiry Type:</strong> ${subjectMap[subject] || subject}
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">Message:</div>
              <div class="message-box">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">Submission Details:</div>
              <div class="field-value">
                <strong>Date:</strong> ${currentDate}<br>
                <strong>User Agent:</strong> ${req.headers.get('user-agent') || 'Not provided'}<br>
                <strong>IP Address:</strong> ${req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Not available'}
              </div>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">📋 Recommended Actions:</h3>
              <ul style="margin: 0; padding-left: 20px; color: #1e40af;">
                ${subject === 'enterprise' ? '<li>Forward to Enterprise Sales Team</li><li>Schedule demo call within 24 hours</li>' : ''}
                ${subject === 'api' ? '<li>Forward to Technical Team</li><li>Provide API documentation</li>' : ''}
                ${subject === 'technical' ? '<li>Assign to Technical Support</li><li>Respond within 4 hours</li>' : ''}
                ${subject === 'billing' ? '<li>Forward to Billing Department</li><li>Review account if applicable</li>' : ''}
                <li>Respond within guaranteed timeframe</li>
                <li>Add to CRM system for follow-up</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p>© 2024 Shrtnly Contact Management System</p>
            <p>This email was automatically generated from the contact form at shrtnly.pro</p>
          </div>
        </div>
      </body>
      </html>
    `
    
    const textContent = `
      New Contact Form Submission - Shrtnly
      
      Contact Information:
      Name: ${name}
      Email: ${email}
      ${phone ? `Phone: ${phone}` : ''}
      ${company ? `Company: ${company}` : ''}
      Inquiry Type: ${subjectMap[subject] || subject}
      
      Message:
      ${message}
      
      Submission Details:
      Date: ${currentDate}
      User Agent: ${req.headers.get('user-agent') || 'Not provided'}
      IP Address: ${req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'Not available'}
      
      ${subject === 'enterprise' || subject === 'technical' ? 'HIGH PRIORITY - Requires immediate attention' : ''}
      
      Please respond according to our support SLA guidelines.
    `

    // Here you would integrate with your email service (SendGrid, AWS SES, etc.)
    // For now, we'll log the email content
    console.log('Contact form submission:', {
      to,
      subject: emailSubject,
      from: email,
      name,
      company,
      phone,
      inquiryType: subject,
      priority: subject === 'enterprise' || subject === 'technical' ? 'HIGH' : 'NORMAL'
    })

    // In a real implementation, you would send the email like this:
    /*
    const emailResponse = await fetch('https://api.sendgrid.v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SENDGRID_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: to }],
          subject: emailSubject,
        }],
        from: { email: 'noreply@shrtnly.com', name: 'Shrtnly Contact Form' },
        reply_to: { email: email, name: name },
        content: [
          { type: 'text/plain', value: textContent },
          { type: 'text/html', value: htmlContent },
        ],
        custom_args: {
          inquiry_type: subject,
          company: company || 'Individual',
          priority: subject === 'enterprise' || subject === 'technical' ? 'high' : 'normal'
        }
      }),
    })
    */

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully',
        reference_id: `SHRTNLY-${Date.now()}`,
        // In development, return the content for testing
        ...(Deno.env.get('ENVIRONMENT') === 'development' && {
          debug: { htmlContent, textContent, subject: emailSubject }
        })
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process contact form',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})