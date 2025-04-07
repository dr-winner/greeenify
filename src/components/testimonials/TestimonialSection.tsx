
import TestimonialCard from './TestimonialCard';

// Import customer images
import customer1 from '@/assets/images/customers/customer1.jpg';
import customer2 from '@/assets/images/customers/customer2.jpg';
import customer3 from '@/assets/images/customers/customer3.jpg';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Loyal Customer',
    image: customer1,
    text: "I've been using Farm Fresh Market for months now, and the quality is consistently excellent. I love knowing exactly where my food comes from!"
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Home Chef',
    image: customer2,
    text: "As a chef, the quality of ingredients matters. Farm Fresh Market's produce has elevated my cooking to a whole new level. My family can taste the difference!"
  },
  {
    id: 3,
    name: 'Emily Roberts',
    role: 'Health Enthusiast',
    image: customer3,
    text: "The organic selection is amazing! Delivery is always prompt, and I love the seasonal variety. Farm Fresh Market has made healthy eating so much easier."
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-green-50">
      <div className="container-custom">
        <h2 className="text-3xl font-heading font-semibold text-center mb-12">What Our Customers Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              role={testimonial.role}
              text={testimonial.text}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
