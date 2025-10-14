import { Clock, Truck, Shield, HeadphonesIcon as HeadphoneIcon } from 'lucide-react';

const Features = () => {
  return (<section className="py-12 ">
    <div className="container mx-auto ">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
          { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
          { icon: Clock, title: '24/7 Support', desc: 'Ready to help' },
          { icon: HeadphoneIcon, title: 'Money Back', desc: '30 days guarantee' }
        ].map((feature, index) => (
          <div key={index} className="group p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="sm:flex items-center  space-x-4">
              <div className="w-full flex justify-center ">
                <div className="w-20 bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors duration-300 flex justify-center items-center mb-4 sm:mb-0">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              <div className='w-full'>
                <h4 className="font-semibold group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>)
};

export default Features;