import React from 'react';

const Blog = () => {
    return (
        <section className="bg-base-200">
        <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
            <h2 className="text-2xl font-semibold sm:text-4xl"> Questions for Assignment 12</h2>
           
            <div className="space-y-4">
                <details className="w-full border-2 rounded-lg">
                    <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">What are the different ways to manage a state in a React application?</summary>
                        <p className="px-4 py-6 pt-0 ml-4 -mt-4 font-custom2">
                            There are several ways to manage state in a React application. Such as:
                            <ol>
                                <li>
                                  1.  We can use the built in state hook, called useState in a specific component. We can pass the state to other components as props.
                                </li>
                                <li>
                                  2.  We can use state management library such as Redux.
                                </li>
                                <li>
                                 3.   We can use Context API also 
                                </li>
                            </ol>
                        </p>
                </details>
                <details className="w-full border rounded-lg">
                    <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">How does prototypical inheritance work?</summary>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4 font-custom2">Prototypical inheritance is a way that JavaScript objects inherit properties and methods from other objects. Every JavaScript object has a prototype, which is another object. When a property or method is requested from an object, the JavaScript engine looks for it in the object itself. If it's not found, it looks for it in the object's prototype. If it's not found there, it looks for it in the prototype's prototype and so on. This continues until the property or method is found or until the end of the prototype chain is reached. If the property or method is not found, it returns undefined. This makes it possible for objects to inherit properties and methods from other objects. </p>
                </details>
                <details className="w-full border rounded-lg">
                    <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">What is a unit test? Why should we write unit tests?</summary>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4 font-custom2">A unit test is a method of testing individual units or components of code to ensure they function as expected. Unit tests are automated tests that check for specific outcomes and are typically written in the same programming language as the code being tested. Unit tests should be written to check for specific functionality within a given unit and should be independent from other units. We should write unit tests to catch bugs early in the development cycle and to ensure that changes to the codebase don't break existing functionality. Writing unit tests also helps developers to think more critically about the design of their code and can improve the overall quality of the codebase. </p>
                </details>
                <details className="w-full border rounded-lg">
                    <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400">React vs. Angular vs. Vue?</summary>
                    <p className="px-4 py-6 pt-0 ml-4 -mt-4 font-custom2">React, Angular and Vue are all popular JavaScript libraries and frameworks for building web applications. React is a library that focuses on building reusable UI components, it's lightweight and easy to learn. Angular is a full-featured framework that provides a lot of tools and features for building complex applications, it's great for large-scale applications. Vue is a framework that combines the best of React and Angular, it's lightweight and easy to learn, and it's great for building both small and large-scale applications. All three of these frameworks have their own strengths and weaknesses </p>
                </details>
    
            </div>
        </div>
    </section>
    );
};

export default Blog;