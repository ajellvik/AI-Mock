export default function FAQ() {
    return (
      <>
        <section className="bg-white">
          <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by Job Seekers</h2>
  
              <p className="mt-4 text-gray-500 sm:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolores laborum labore
                provident impedit esse recusandae facere libero harum sequi.
              </p>
            </div>
  
            <div className="mt-8 sm:mt-12">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100">
                <div className="flex flex-col px-4 py-8 text-center">
                  <dt className="order-last text-lg font-medium text-gray-500">Job Offer Increase</dt>
                  <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">78%</dd>
                </div>
  
                <div className="flex flex-col px-4 py-8 text-center">
                  <dt className="order-last text-lg font-medium text-gray-500">Customer Satisfaction</dt>
                  <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">98%</dd>
                </div>
  
                <div className="flex flex-col px-4 py-8 text-center">
                  <dt className="order-last text-lg font-medium text-gray-500">Average Salary Increase</dt>
                  <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">$26k</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
  
{/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

<section className="overflow-hidden sm:grid sm:grid-cols-2">
  <div className="p-8 md:p-12 lg:px-16 lg:py-24">
    <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
      <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit
      </h2>

      <p className="hidden text-gray-500 md:mt-4 md:block">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam
        sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
        quisque ut interdum tincidunt duis.
      </p>

      <div className="mt-4 md:mt-8">
        <a
          href="#"
          className="inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-yellow-400"
        >
          Get Started Today
        </a>
      </div>
    </div>
  </div>

  <img
    alt=""
    src="https://images.unsplash.com/photo-1464582883107-8adf2dca8a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
    className="h-56 w-full object-cover sm:h-full"
  />
</section>
      </>
    );
  }
  