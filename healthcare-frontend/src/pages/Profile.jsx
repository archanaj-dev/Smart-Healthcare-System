import { useEffect, useState } from "react";

function Profile() {

    const [profile, setProfile] = useState({});

    useEffect(() => {

        const email = localStorage.getItem("userEmail");

        fetch(`https://smart-healthcare-system-tkm2.onrender.com/profile/${email}`)
            .then(res => res.json())
            .then(data => setProfile(data));

    }, []);

    return (

        <div className="profile-container">

            <div className="profile-card">

                <h1>👤 My Profile</h1>

                <div className="profile-item">
                    <strong>Name</strong>
                    <span>{profile.name}</span>
                </div>

                <div className="profile-item">
                    <strong>Email</strong>
                    <span>{profile.email}</span>
                </div>

                <div className="profile-item">
                    <strong>Phone</strong>
                    <span>{profile.phone}</span>
                </div>

                <div className="profile-item">
                    <strong>Date of Birth</strong>
                    <span>{profile.dob}</span>
                </div>

                <div className="profile-item">
                    <strong>Gender</strong>
                    <span>{profile.gender}</span>
                </div>

                <div className="profile-item">
                    <strong>Blood Group</strong>
                    <span>{profile.blood_group}</span>
                </div>

                <div className="profile-item">
                    <strong>Address</strong>
                    <span>{profile.address}</span>
                </div>

            </div>

        </div>

    );

}

export default Profile;