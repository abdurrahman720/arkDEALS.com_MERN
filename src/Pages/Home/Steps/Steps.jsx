import React from 'react';

const Steps = () => {
    return (
        <section className="bg-base-200">
	<div className="container max-w-5xl px-4 py-12 pt-15 mx-auto">
		<div className="grid gap-4 mx-4 sm:grid-cols-12">
			<div className="col-span-12 sm:col-span-3">
				<div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-primary">
					<h3 className="text-3xl font-semibold">Buying steps are so easy!</h3>
					<span className="text-sm font-bold tracking-wider uppercase dark:text-gray-400">We ensure the best safety for both buyer and seller</span>
				</div>
			</div>
			<div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
				<div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-700">
					<div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-primary">
						<h3 className="text-xl font-semibold tracking-wide">Choose your product and place order booking! </h3>
						<time className="text-xs tracking-wide uppercase dark:text-gray-400">Start with your preferred one!</time>
						<p className="mt-3 font-custom2">You can browse and check all the available laptops on Browse page! Just click on <b>View Item</b> and if you want to buy, just hit <b>Book Order</b> and provide your details! </p>
					</div>
					<div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-primary">
						<h3 className="text-xl font-semibold tracking-wide">Meet the seller!</h3>
						<time className="text-xs tracking-wide uppercase dark:text-gray-400">Time to verify the condition!</time>
						<p className="mt-3 font-custom2">You will have a meeting with the seller and We Strongly suggest both buyer and seller to meet physically!</p>
					</div>
					<div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-primary">
						<h3 className="text-xl font-semibold tracking-wide">Pay for the Product!</h3>
						<time className="text-xs tracking-wide uppercase dark:text-gray-400">Time to grab the product!</time>
						<p className="mt-3 font-custom2">After meeting, if your deal is finalized, the seller will let you pay! Make the payment and get your Laptop,BOOM!</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
    );
};

export default Steps;