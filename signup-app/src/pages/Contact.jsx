import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData)
      alert('Thank you for your message! We\'ll get back to you soon.')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div>
      {/* Hero Section */}
      <div className='text-2xl text-center pt-8 border-t'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
          <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
        </div>
      </div>

      {/* Main Content */}
      <div className='my-10 flex flex-col md:flex-row gap-16 mx-4 sm:mx-8 lg:mx-16 xl:mx-24'>
        {/* Contact Information */}
        <div className='flex flex-col justify-start gap-8 md:w-2/5'>
          <div>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>Get in Touch</h2>
            <p className='text-gray-600 mb-6'>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Details */}
          <div className='space-y-6'>
            <div className='flex items-start gap-4'>
              <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                <div className='w-4 h-4 bg-gray-600 rounded-full'></div>
              </div>
              <div>
                <h3 className='font-semibold text-gray-800 mb-1'>Phone</h3>
                <p className='text-gray-600 text-sm'>(415) 555-0132</p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                <div className='w-4 h-4 bg-gray-600 rounded-full'></div>
              </div>
              <div>
                <h3 className='font-semibold text-gray-800 mb-1'>Email</h3>
                <p className='text-gray-600 text-sm'>admin@CareerCloset.com</p>
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <div className='w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1'>
                <div className='w-4 h-4 bg-gray-600 rounded-full'></div>
              </div>
              <div>
                <h3 className='font-semibold text-gray-800 mb-1'>Business Hours</h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Careers Section */}
          <div className='mt-8 pt-8 border-t border-gray-200'>
            <h3 className='font-semibold text-gray-800 mb-2'>Jobs at Career Closet</h3>
            <p className='text-gray-600 text-sm mb-4'>
              Learn more about our teams and job openings.
            </p>
            <button className='text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors border border-gray-300 px-6 py-2 hover:bg-gray-50'>
              Explore Jobs
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className='md:w-3/5'>
          <div className='bg-white border border-gray-300 rounded-lg p-8'>
            <h2 className='text-xl font-semibold text-gray-800 mb-6'>Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Full Name *
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder='Enter your full name'
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                      errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-gray-500'
                    }`}
                  />
                  {errors.name && (
                    <p className='mt-1 text-red-500 text-sm'>{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email Address *
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder='Enter your email'
                    className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-gray-500'
                    }`}
                  />
                  {errors.email && (
                    <p className='mt-1 text-red-500 text-sm'>{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Subject *
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder='What is this regarding?'
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors ${
                    errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-gray-500'
                  }`}
                />
                {errors.subject && (
                  <p className='mt-1 text-red-500 text-sm'>{errors.subject}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Message *
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder='Tell us more about your inquiry...'
                  rows='6'
                  className={`w-full px-4 py-3 border rounded-lg outline-none transition-colors resize-vertical ${
                    errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-gray-500'
                  }`}
                />
                {errors.message && (
                  <p className='mt-1 text-red-500 text-sm'>{errors.message}</p>
                )}
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className={`w-full sm:w-auto px-8 py-3 bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-700'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='bg-gray-50 py-16 px-4 sm:px-8 lg:px-16 xl:px-24'>
        <div className='text-2xl text-center mb-10'>
          <div className='inline-flex gap-2 items-center'>
            <p className='text-gray-500'>FREQUENTLY <span className='text-gray-700 font-medium'>ASKED QUESTIONS</span></p>
            <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
          </div>
        </div>

        <div className='max-w-3xl mx-auto space-y-4'>
          <details className='bg-white border border-gray-200 rounded-lg p-6 group'>
            <summary className='font-semibold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors'>
              What are your shipping options and delivery times?
            </summary>
            <p className='mt-4 text-gray-600 text-sm leading-relaxed'>
              We offer standard shipping (5-7 business days) and express shipping (2-3 business days). Free standard shipping is available on orders over $50. Express shipping rates vary by location.
            </p>
          </details>

          <details className='bg-white border border-gray-200 rounded-lg p-6 group'>
            <summary className='font-semibold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors'>
              What is your return and exchange policy?
            </summary>
            <p className='mt-4 text-gray-600 text-sm leading-relaxed'>
              We offer a 7-day return policy for most items. Products must be unused, in original condition, and with tags attached. Some exclusions apply for hygiene and personalized items.
            </p>
          </details>

          <details className='bg-white border border-gray-200 rounded-lg p-6 group'>
            <summary className='font-semibold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors'>
              How can I track my order?
            </summary>
            <p className='mt-4 text-gray-600 text-sm leading-relaxed'>
              Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the "My Orders" section.
            </p>
          </details>

          <details className='bg-white border border-gray-200 rounded-lg p-6 group'>
            <summary className='font-semibold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors'>
              Do you offer international shipping?
            </summary>
            <p className='mt-4 text-gray-600 text-sm leading-relaxed'>
              Currently, we ship within the United States only. We're working on expanding our international shipping options. Please check back for updates.
            </p>
          </details>

          <details className='bg-white border border-gray-200 rounded-lg p-6 group'>
            <summary className='font-semibold text-gray-800 cursor-pointer hover:text-gray-600 transition-colors'>
              What payment methods do you accept?
            </summary>
            <p className='mt-4 text-gray-600 text-sm leading-relaxed'>
              We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. All transactions are secure and encrypted.
            </p>
          </details>
        </div>
      </div>

      {/* Contact Methods */}
      <div className='py-16 mx-4 sm:mx-8 lg:mx-16 xl:mx-24'>
        <div className='text-2xl text-center mb-10'>
          <div className='inline-flex gap-2 items-center'>
            <p className='text-gray-500'>OTHER WAYS TO <span className='text-gray-700 font-medium'>REACH US</span></p>
            <div className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
          <div className='group cursor-pointer'>
            <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors'>
              <div className='w-8 h-8 bg-gray-800 rounded group-hover:bg-white transition-colors'></div>
            </div>
            <h3 className='font-semibold text-gray-800 mb-2'>Live Chat</h3>
            <p className='text-gray-600 text-sm mb-3'>Available 24/7 for instant support</p>
            <button className='text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors border border-gray-300 px-4 py-2 rounded hover:bg-gray-50'>
              Start Chat
            </button>
          </div>

          <div className='group cursor-pointer'>
            <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors'>
              <div className='w-8 h-8 bg-gray-800 rounded group-hover:bg-white transition-colors'></div>
            </div>
            <h3 className='font-semibold text-gray-800 mb-2'>Call Us</h3>
            <p className='text-gray-600 text-sm mb-3'>Speak directly with our support team</p>
            <a 
              href='tel:+14155550132' 
              className='text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 inline-block'
            >
              (415) 555-0132
            </a>
          </div>

          <div className='group cursor-pointer'>
            <div className='w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-800 transition-colors'>
              <div className='w-8 h-8 bg-gray-800 rounded group-hover:bg-white transition-colors'></div>
            </div>
            <h3 className='font-semibold text-gray-800 mb-2'>Email Support</h3>
            <p className='text-gray-600 text-sm mb-3'>Get detailed help via email</p>
            <a 
              href='mailto:admin@forever.com' 
              className='text-sm font-medium text-gray-800 hover:text-gray-600 transition-colors border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 inline-block'
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
