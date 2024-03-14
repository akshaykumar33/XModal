import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phno, setPhno] = useState('');
  const [date, setDate] = useState('');
  const [forms, setForms] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current==event.target) {
        setForms(false);
      }
    };

    if (forms) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [forms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phno.length !== 10) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
    } else if (!email.includes('@')) {
      alert('Invalid email. Please check your email address.');
    } else if (new Date(date) >= Date.now()) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
    } else {
      alert('Form submitted successfully');
      setUsername('');
      setEmail('');
      setPhno('');
      setDate('');
      setForms(false);
    }
  };

  return (
    <div className="card" >
      <h1>User Detail Modal</h1>
      <button onClick={() => setForms(!forms)}>{!forms ? 'Open Form' : 'Close Form'}</button>
      <div>
      {forms && (
        <div className="modal" ref={modalRef}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <h1>Fill Details</h1>
              <label>Username:</label>
              <input type='text' value={username} name='username' id='username' required onChange={(e) => setUsername(e.target.value)} />
              <label>Email Address:</label>
              <input type='email' value={email} name='email' id='email' required onChange={(e) => setEmail(e.target.value)} />
              <label>Phone Number:</label>
              <input type='tel' value={phno} name='phno' id='phone' required onChange={(e) => setPhno(e.target.value)} />
              <label>Date of Birth:</label>
              <input type='date' value={date} name='date' id='dob' required onChange={(e) => setDate(e.target.value)} />
              <button type='submit' className='submit-button'>Submit</button>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
