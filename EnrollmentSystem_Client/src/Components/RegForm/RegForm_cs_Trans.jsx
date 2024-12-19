import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function RegForm_cs_Trans() {
  const location = useLocation();
  const { yearLevel, department } = location.state;
  const studentType = "transferee";
  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

    // Form States
   const [lastName, setLastName] = useState("");
   const [firstName, setFirstName] = useState("");
   const [middleName, setMiddleName] = useState("");
   const [suffix, setSuffix] = useState("");
   const [disableSuffix, setDisableSuffix] = useState(false);
 
   const [dateOfBirth, setDateOfBirth] = useState("");
   const [placeOfBirth, setPlaceOfBirth] = useState("");
   const [age, setAge] = useState("");
   const [status, setStatus] = useState("");
 
   const [mobile, setMobile] = useState("");
   const [email, setEmail] = useState("");
   const [religion, setReligion] = useState("");
   const [citizenship, setCitizenship] = useState("");
   const [others, setOthers] = useState("");
 
   const [houseStreet, setHouseStreet] = useState("");
   const [region, setRegion] = useState("");
   const [province, setProvince] = useState("");
   const [municipality, setMunicipality] = useState("");
   const [zipcode, setZipcode] = useState("");
 
   const [guardianLastName, setGuardianLastName] = useState("");
   const [guardianFirstName, setGuardianFirstName] = useState("");
   const [guardianMiddleName, setGuardianMiddleName] = useState("");
   const [guardianRelation, setGuardianRelation] = useState("");
 
   // Validation Rules
   const nameRegex = /^[A-Za-z ]+$/; // Only letters and spaces
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
   const mobileRegex = /^[0-9]{10,11}$/; // 10 or 11-digit phone number (adjust as needed)



  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileSizeInKB = file.size / 1024;
      if (fileSizeInKB > 200) {
        setErrorMessage(
          "File size exceeds 200 KB. Please upload a smaller image."
        );
        e.target.value = "";
        return;
      }

      setErrorMessage("");

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreviewClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = () => {
    if (validateForm()) {
      let route = `/regformpt2-${department}-${studentType}`;
      navigate(route, { state: { yearLevel, department } });
    }
  };

  const validateForm = () => {
    // Validate Name fields
    if (!nameRegex.test(lastName) || !nameRegex.test(firstName) || 
        (middleName && !nameRegex.test(middleName)) || 
        (suffix && !disableSuffix && !nameRegex.test(suffix))) {
      setErrorMessage("Invalid characters in Name fields. Letters and spaces only.");
      return false;
    }

    // Validate Email
    if (email && !emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }

    // Validate Mobile
    if (mobile && !mobileRegex.test(mobile)) {
      setErrorMessage("Please enter a valid mobile number (10-11 digits).");
      return false;
    }

    // Validate Address Fields (Ensure not blank)
    if (!houseStreet.trim() || !region.trim() || !province.trim() || !municipality.trim() || !zipcode.trim()) {
      setErrorMessage("All address fields must be filled out.");
      return false;
    }

    // Validate Guardian Name Fields
    if (!nameRegex.test(guardianLastName) || !nameRegex.test(guardianFirstName) || 
        (guardianMiddleName && !nameRegex.test(guardianMiddleName))) {
      setErrorMessage("Invalid characters in Guardian Name fields. Letters and spaces only.");
      return false;
    }

    setErrorMessage("");
    return true;
  };
  
   // Toggle suffix field
   const handleSuffixToggle = () => {
    setDisableSuffix(!disableSuffix);
    if (!disableSuffix) {
      // If we are disabling suffix, clear it out
      setSuffix("");
    }
  };

  return (
    <div className="containers" style={{ marginTop: "150px" }}>
      <div className="header">
        <Link to="/">
          <img
            src="./images/cvsu-logo.png"
            alt="University Logo"
            className="logo"
          />
        </Link>
        <p>
          CAVITE STATE UNIVERSITY <br /> BACOOR CAMPUS
        </p>
      </div>

      <div className="d-flex justify-content-center mt-4 pb-5">
        <div
          className="card shadow rounded position-relative overflow-hidden"
          style={{ maxWidth: "1200px", width: "100%" }}
        >
          {/* Blurred Background Image Layer */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: "url(./images/cs.png)",
              backgroundSize: "50%", // Adjust the percentage as desired
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(5px)",
              zIndex: 2,
            }}
          ></div>

          {/* Optional semi-transparent overlay for better readability */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1,
            }}
          ></div>

          <div className="card-body position-relative " style={{ zIndex: 2 }}>
            {/* Title */}
            <div className="row mb-4">
              <div className="col-12 text-center">
                <h4 className="fw-bold">TRANSFEREE FORM</h4>
              </div>
            </div>

            {/* First Row: Name Fields + Image Upload */}
            <div className="row mb-3 align-items-end">
              {/* Image upload on the left */}
              <div className="col-md-3 d-flex flex-column align-items-center">
                <div
                  className="border rounded mb-2"
                  onClick={handlePreviewClick}
                  style={{
                    width: "150px",
                    height: "150px",
                    cursor: "pointer",
                    backgroundColor: "#f8f9fa",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span className="text-muted text-center">
                      Click to upload
                      <br />
                      2x2
                    </span>
                  )}
                </div>
                <input
                  id="fileInput"
                  type="file"
                  className="form-control d-none"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <small className="text-muted text-center mt-2">
                  Photo (200 KB max.)
                </small>
                {errorMessage && (
                  <div className="text-danger text-center mt-2">
                    {errorMessage}
                  </div>
                )}
              </div>

               {/* Name fields */}
               <div className="col-md-9">
                <div className="row g-2">
                  <div className="col-md-3">
                    <label className="form-label">Last Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)} 
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">First Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)} 
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Middle Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)} 
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Suffix</label>
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control"
                        value={suffix}
                        onChange={(e) => setSuffix(e.target.value)} 
                        disabled={disableSuffix}
                      />
                      <span className="input-group-text" style={{ cursor: 'pointer' }} onClick={handleSuffixToggle}>
                        {disableSuffix ? <i className="fa fa-lock" /> : <i className="fa fa-unlock" />}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row: Date of Birth, Place of Birth, Age, Status */}
            <div className="row mb-3 g-2">
              <div className="col-md-3">
                <label className="form-label">Date of Birth</label>
                <input 
                  type="date" 
                  className="form-control" 
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Place of Birth</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={placeOfBirth}
                  onChange={(e) => setPlaceOfBirth(e.target.value)} 
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Age</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)} 
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Status</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)} 
                />
              </div>
            </div>

            {/* Third Row: Mobile, Email, Religion, Citizenship, Others */}
            <div className="row mb-3 g-2">
              <div className="col-md-2">
                <label className="form-label">Mobile</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)} 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Religion</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)} 
                />
              </div>
              <div className="col-md-2">
                <label className="form-label">Citizenship</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={citizenship}
                  onChange={(e) => setCitizenship(e.target.value)} 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Others (e.g., Nationality)</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={others}
                  onChange={(e) => setOthers(e.target.value)} 
                />
              </div>
            </div>

            {/* Home Address Section */}
            <div className="row mb-3">
              <div className="col-12">
                <hr />
                <label className="form-label fw-bold">Home Address:</label>
              </div>
            </div>

            <div className="row mb-3 g-2">
              <div className="col-12">
                <label className="form-label">
                  House Number / Street / Barangay
                </label>
                <input 
                  type="text" 
                  className="form-control"
                  value={houseStreet}
                  onChange={(e) => setHouseStreet(e.target.value)} 
                />
              </div>
            </div>

            <div className="row mb-3 g-2">
              <div className="col-md-3">
                <label className="form-label">Region</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)} 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Province</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)} 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Municipality</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)} 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Zipcode</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)} 
                />
              </div>
            </div>

            {/* Guardian Name */}
            <div className="row mb-3">
              <div className="col-12">
                <hr />
                <label className="form-label fw-bold">Guardian Name:</label>
              </div>
            </div>

            <div className="row mb-3 g-2">
              <div className="col-md-3">
                <label className="form-label">Family Name</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={guardianLastName}
                  onChange={(e) => setGuardianLastName(e.target.value)} 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">First Name</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={guardianFirstName}
                  onChange={(e) => setGuardianFirstName(e.target.value)} 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Middle Name</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={guardianMiddleName}
                  onChange={(e) => setGuardianMiddleName(e.target.value)} 
                />
              </div>
              <div className="col-md-3">
                <label className="form-label">Relation</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={guardianRelation}
                  onChange={(e) => setGuardianRelation(e.target.value)} 
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="row mb-3">
                <div className="col-12">
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                </div>
              </div>
            )}

            {/* Next Page button */}
            <div className="row mb-5">
              <div className="col-12 d-flex justify-content-end">
                <button onClick={handleSubmit} className="btn btn-success">
                  Next Page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegForm_cs_Trans;
