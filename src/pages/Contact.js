import React from 'react';

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-4">
          Have questions or feedback? We'd love to hear from you!
        </p>
        <div className="space-y-4">
          <p className="text-lg">Email: contact@arlivery.com</p>
          <p className="text-lg">Phone: (555) 123-4567</p>
          <p className="text-lg">Address: 123 AR Street, Tech City, TC 12345</p>
        </div>
      </div>
    </div>
  );
}

export default Contact; 