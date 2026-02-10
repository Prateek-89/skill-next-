const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();

    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@skillnest.com',
      password: 'adminpassword123',
      role: 'admin',
    });

    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
    });

    const courses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
        instructor: 'Dr. Angela Yu',
        duration: '60 Hours',
        price: 19.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/1565838_e54e_18.jpg',
      },
      {
        title: 'React - The Complete Guide 2024',
        description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
        instructor: 'Maximilian Schwarzmüller',
        duration: '48 Hours',
        price: 24.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg',
      },
      {
        title: 'Machine Learning A-Z: AI, Python & R',
        description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.',
        instructor: 'Kirill Eremenko',
        duration: '42 Hours',
        price: 14.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/950390_270f_3.jpg',
      },
      {
        title: 'Python for Data Science and Machine Learning',
        description: 'Complete Python course for data science, machine learning, and automation. Learn pandas, numpy, matplotlib, and more!',
        instructor: 'Jose Portilla',
        duration: '55 Hours',
        price: 29.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/1754098_e0df_3.jpg',
      },
      {
        title: 'The Complete JavaScript Course 2024',
        description: 'Master JavaScript with the most complete course! Projects, challenges, ES6+, OOP, AJAX, Webpack, and more.',
        instructor: 'Jonas Schmedtmann',
        duration: '68 Hours',
        price: 22.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/851712_fc61_6.jpg',
      },
      {
        title: 'Node.js - The Complete Guide',
        description: 'Master Node.js and build modern, scalable server-side applications with Node.js, Express, MongoDB, and more!',
        instructor: 'Maximilian Schwarzmüller',
        duration: '40 Hours',
        price: 27.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/1879018_95b6_3.jpg',
      },
      {
        title: 'AWS Certified Solutions Architect',
        description: 'Learn AWS from scratch and prepare for the AWS Certified Solutions Architect Associate exam. Real-world projects included.',
        instructor: 'Ryan Kroonenburg',
        duration: '50 Hours',
        price: 34.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/2196488_8fc7_10.jpg',
      },
      {
        title: 'Docker & Kubernetes: The Practical Guide',
        description: 'Learn Docker, Docker Compose, Multi-Stage Builds, Dockerfile, Kubernetes, and more with hands-on projects.',
        instructor: 'Maximilian Schwarzmüller',
        duration: '35 Hours',
        price: 26.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/3145716_98d3_3.jpg',
      },
      {
        title: 'UI/UX Design Bootcamp',
        description: 'Master UI/UX design principles, Figma, prototyping, user research, and create stunning interfaces that users love.',
        instructor: 'Joe Natoli',
        duration: '45 Hours',
        price: 19.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/1652588_9c55_2.jpg',
      },
      {
        title: 'Complete SQL Bootcamp',
        description: 'Master SQL and database management. Learn PostgreSQL, MySQL, complex queries, joins, and database design.',
        instructor: 'Jose Portilla',
        duration: '30 Hours',
        price: 18.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/1754098_e0df_3.jpg',
      },
      {
        title: 'Flutter & Dart - The Complete Guide',
        description: 'Build beautiful, fast, and native-quality apps with Flutter. Learn Dart programming and create cross-platform mobile apps.',
        instructor: 'Maximilian Schwarzmüller',
        duration: '55 Hours',
        price: 31.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/1708340_9d78_2.jpg',
      },
      {
        title: 'GraphQL with React: The Complete Developer\'s Guide',
        description: 'Learn GraphQL by building real-world applications with React and Node.js. Master queries, mutations, and subscriptions.',
        instructor: 'Stephen Grider',
        duration: '38 Hours',
        price: 25.99,
        thumbnail: 'https://img-c.udemycdn.com/course/750x422/1409142_1879_8.jpg',
      },
    ];

    await Course.insertMany(courses);

    console.log('Data Imported!');
    console.log('Admin Credentials: admin@skillnest.com / adminpassword123');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // destroyData(); // Implement if needed
} else {
  importData();
}
