import { Clock, Truck, Shield, HeadphonesIcon as HeadphoneIcon } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-8 sm:py-12 px-4 sm:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
            { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
            { icon: Clock, title: '24/7 Support', desc: 'Ready to help' },
            { icon: HeadphoneIcon, title: 'Money Back', desc: '30 days guarantee' }
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-4 sm:p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300 flex justify-center items-center">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 flex items-center ">
                  <div className="text-center sm:text-left ">
                    <h4 className="font-semibold text-sm sm:text-base lg:text-lg group-hover:text-blue-600 transition-colors duration-300 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;