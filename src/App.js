import { useState } from 'react';
import './App.css';


function App() {
  const [courses, setCourses] = useState([
    { name: '', grade: 'A', credits: 3, calculate: true },
  ]);

  const handleCourseChange = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: 'A', credits: 3, calculate: true }]);
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      if (course.calculate) {
        const gradePoint = getGradePoint(course.grade);
        totalPoints += gradePoint * course.credits;
        totalCredits += course.credits;
      }
    });

    return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
  };

  const getGradePoint = (grade) => {
    switch (grade) {
      case 'A':
        return 4.0;
      case 'B+':
        return 3.5;
      case 'B':
        return 3.0;
      case 'C+':
        return 2.5;
      case 'C':
        return 2.0;
      case 'D':
        return 1.0;
      case 'F':
        return 0.0;
      default:
        return 0;
    }
  };

  const resetCourses = () => {
    setCourses([{ name: '', grade: 'A', credits: 3, calculate: true }]);
  };

  return (
    <div className='min-h-screen bg-gray-800 flex items-center justify-center'>
      <div className='bg-white my-32 h-4/5 min-w-36 mx-14 rounded-2xl shadow-[0_0_10px_5px_rgba(0,0,0,0.25)] shadow-cyan-600'>
        <h1 className='text-3xl py-2 border-b-2 bg-cyan-500 rounded-t-2xl border-stone-900 text-center'>Calculate Your GPA</h1>
        <form className='p-4'>
          {courses.map((course, index) => (
            <div key={index} className='flex items-center mb-4'>
              <input
                type='text'
                placeholder='Course Name'
                value={course.name}
                onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                className='border border-gray-300 rounded p-2 w-1/3 mr-2'
              />
              <select
                value={course.grade}
                onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                className='border border-gray-300 rounded p-2 w-1/4 mr-2'
              >
                <option value='A'>A</option>
                <option value='B+'>B+</option>
                <option value='B'>B</option>
                <option value='C+'>C+</option>
                <option value='C'>C</option>
                <option value='D'>D</option>
                <option value='F'>F</option>
              </select>
              <input
                type='number'
                value={course.credits}
                onChange={(e) => handleCourseChange(index, 'credits', Math.max(1, e.target.value))}
                className='border border-gray-300 rounded p-2 w-1/4 mr-2'
                min='1'
              />
              <label className='flex items-center'>
                <input
                  type='checkbox'
                  checked={course.calculate}
                  onChange={(e) => handleCourseChange(index, 'calculate', e.target.checked)}
                  className='mr-2'
                />
                Calculate
              </label>
              <button 
                type="button" 
                onClick={() => removeCourse(index)} 
                className=" text-slate-950 ml-2 hover:text-red-500 hover:transition-all"
                >
                <svg 
                    width="24" height="24" viewBox="0 0 24 24" fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="hover:scale-110 transition-transform duration-400"
                >
                    <path 
                        d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5" 
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                </svg>
              </button>
            </div>
          ))}
          <div className='flex justify-between'>
            <button type='button' onClick={addCourse} className='bg-cyan-500 hover:bg-blue-600 transition-colors text-white rounded-full px-4 py-2 mt-4 flex items-center'>
            <svg width="20" height="100%" viewBox="0 0 24 24" fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className='mt-'
              
            >
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
              Add Course
            </button>

            <button
            className='bg-cyan-500 hover:bg-blue-600 transition-colors text-white rounded-full px-4 py-2 mt-4 flex items-center'
            onClick={resetCourses}
            >
            <svg width="15" height="100%" viewBox="0 0 24 24" fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className='mr-1'
            >
            <path d="M2 14C2 14 2.12132 14.8492 5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364C19.6092 17.1187 20.4133 15.5993 20.7762 14M2 14V20M2 14H8M22 10C22 10 21.8787 9.15076 18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604C4.39076 6.88131 3.58669 8.40072 3.22383 10M22 10V4M22 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
              Reset
            </button>

          </div>
        </form>
        <div className='text-center mt-4 mb-8'>
          <h2 className='text-2xl'>Your GPA: {calculateGPA()}</h2>
        </div>
      </div>
    </div>
  );
}


export default App;
