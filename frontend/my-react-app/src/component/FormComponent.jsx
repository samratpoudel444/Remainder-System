import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../css/form.css";

function FormComponent() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
        phoneNo: '',
        address: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/users/SignUpUsers", formData);
            console.log("Registration successful:", response.data);
            toast.success("Registration Successful");
        } catch (err) {
            if (err.response && err.response.status === 409) {
                toast.error("The email you provided is already in use. Please try a different one.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="FormPage">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <header>Registration Form</header>

                    <label>FirstName
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} /><br />
                    </label>

                    <label>LastName
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} /><br />
                    </label>

                    <label>Email
                        <input type="email" name="email" value={formData.email} onChange={handleChange} /><br />
                    </label>

                    <label>Password
                        <input type="password" name="password" value={formData.password} onChange={handleChange} /><br />
                    </label>

                    <label>ConfirmPassword
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} /><br />
                    </label>

                    <label>Date Of Birth
                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} /><br />
                    </label>

                    <label>PhoneNo:
                        <input type="number" name="phoneNo" value={formData.phoneNo} onChange={handleChange} /><br />
                    </label>

                    <label>Address
                        <input type="text" name="address" value={formData.address} onChange={handleChange} /><br />
                    </label>

                    <button type="submit">Submit</button>

                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default FormComponent;
