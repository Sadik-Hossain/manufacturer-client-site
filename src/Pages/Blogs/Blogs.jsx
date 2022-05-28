import React from "react";
import "./Blogs.css";
const Blogs = () => {
  return (
    <div style={{ padding: "0 4rem" }}>
      <div className="ans-card">
        <h1>1. How will you improve the performance of a react application?</h1>
        <p>
          we can improve the performance of a react application by Keeping
          component state local where necessary. Memoizing React components to
          prevent unnecessary re-renders. Code-splitting in React using dynamic
          import(). Windowing or list virtualization in React. Lazy loading
          images in React.
        </p>
      </div>
      <div className="ans-card">
        <h1>
          2. What are the different ways to manage a state in a React
          application?
        </h1>
        <p>
          The state is an object that holds information about a certain
          component. We can manage a state in React by using useState hook. Use
          reducer hook. We can also use library like Redux.{" "}
        </p>
      </div>
      <div className="ans-card">
        <h1>3. How does prototypical inheritance work?</h1>
        <p>
          The Prototypal Inheritance is a feature in javascript used to add
          methods and properties in objects. It is a method by which an object
          can inherit the properties and methods of another object.
        </p>
      </div>
      <div className="ans-card">
        <h1>4.Why you do not set the state directly in React?</h1>
        <p>
          {" "}
          If we try to update state directly, then it won't re-render the
          component. Instead, we use setState() method. It schedules an update
          to a component's state object. When state changes, the component
          responds by re-rendering.
        </p>
      </div>
      <div className="ans-card">
        <h1>
          5. You have an array of products. Each product has a name, price,
          description, etc. How will you implement a search to find products by
          name?
        </h1>
        <p>
          The find() method returns the first element in the provided array that
          satisfies the provided criteria for example in here its product name.
          If no values satisfy the criteria, undefined is returned.
        </p>
      </div>
      <div className="ans-card">
        <h1>6. What is a unit test? Why should write unit tests?</h1>
        <p>
          Unit tests are typically automated tests that are written and run by
          software developers to ensure that a section of an application (known
          as the "unit") meets its design and behaves as intended. One of the
          benefits of unit tests is that they isolate a function, class or
          method and only test that piece of code. Higher quality individual
          components create overall system resiliency. Thus, the result is
          reliable code. Unit tests also change the nature of the debugging
          process.
        </p>
      </div>
    </div>
  );
};

export default Blogs;
