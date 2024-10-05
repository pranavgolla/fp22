import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import './Student.css';

const FormComponent = () => {
  const [students, setStudents] = useState([]);
  const [viewFormat, setViewFormat] = useState("grid");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // Image preview for photo
  const [tcFile, setTcFile] = useState(null); // TC PDF file
  const [aadhaarFile, setAadhaarFile] = useState(null); // Aadhaar Card PDF file

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      parentName: "",
      motherName: "",
      previousSchool: "",
      previousClass: "",
      presentClass: "",
      term1Fee: "",
      term2Fee: "",
      term3Fee: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      parentName: Yup.string().required("Required"),
      motherName: Yup.string().required("Required"),
      previousSchool: Yup.string().required("Required"),
      previousClass: Yup.string().required("Required"),
      presentClass: Yup.string().required("Required"),
      term1Fee: Yup.number().required("Required"),
      term2Fee: Yup.number().required("Required"),
      term3Fee: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const newStudent = { ...values, file, tcFile, aadhaarFile };
      setStudents([...students, newStudent]);
      formik.resetForm();
      setFile(null);
      setFilePreview(null);
      setTcFile(null);
      setAadhaarFile(null);
    },
  });

  const onDropPhoto = (acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(uploadedFile);
  };

  const onDropTC = (acceptedFiles) => {
    setTcFile(acceptedFiles[0]);
  };

  const onDropAadhaar = (acceptedFiles) => {
    setAadhaarFile(acceptedFiles[0]);
  };

  const { getRootProps: getPhotoProps, getInputProps: getPhotoInputProps } = useDropzone({ onDrop: onDropPhoto });
  const { getRootProps: getTCProps, getInputProps: getTCInputProps } = useDropzone({ onDrop: onDropTC, accept: ".pdf" });
  const { getRootProps: getAadhaarProps, getInputProps: getAadhaarInputProps } = useDropzone({ onDrop: onDropAadhaar, accept: ".pdf" });

  const handleViewChange = (format) => {
    setViewFormat(format);
  };

  return (
    <div style={containerStyle}>
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: "50%", padding: "10px", alignItems: "flex-start" }}
      >
        <div>
          <label>First Name</label>
          <input
            type="text"
            {...formik.getFieldProps("firstName")}
            style={formik.touched.firstName && formik.errors.firstName ? inputFocusStyle : inputStyle}
          />
          {formik.touched.firstName && formik.errors.firstName && <div>{formik.errors.firstName}</div>}
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            {...formik.getFieldProps("lastName")}
            style={formik.touched.lastName && formik.errors.lastName ? inputFocusStyle : inputStyle}
          />
          {formik.touched.lastName && formik.errors.lastName && <div>{formik.errors.lastName}</div>}
        </div>

        <div>
          <label>Father/Guardian Name</label>
          <input
            type="text"
            {...formik.getFieldProps("parentName")}
            style={formik.touched.parentName && formik.errors.parentName ? inputFocusStyle : inputStyle}
          />
          {formik.touched.parentName && formik.errors.parentName && <div>{formik.errors.parentName}</div>}
        </div>

        <div>
          <label>Mother's Name</label>
          <input
            type="text"
            {...formik.getFieldProps("motherName")}
            style={formik.touched.motherName && formik.errors.motherName ? inputFocusStyle : inputStyle}
          />
          {formik.touched.motherName && formik.errors.motherName && <div>{formik.errors.motherName}</div>}
        </div>

        <div>
          <label>Previous School</label>
          <input
            type="text"
            {...formik.getFieldProps("previousSchool")}
            style={formik.touched.previousSchool && formik.errors.previousSchool ? inputFocusStyle : inputStyle}
          />
          {formik.touched.previousSchool && formik.errors.previousSchool && <div>{formik.errors.previousSchool}</div>}
        </div>

        <div>
          <label>Previous Standard/Class</label>
          <input
            type="text"
            {...formik.getFieldProps("previousClass")}
            style={formik.touched.previousClass && formik.errors.previousClass ? inputFocusStyle : inputStyle}
          />
          {formik.touched.previousClass && formik.errors.previousClass && <div>{formik.errors.previousClass}</div>}
        </div>

        <div>
          <label>Present Standard/Class</label>
          <input
            type="text"
            {...formik.getFieldProps("presentClass")}
            style={formik.touched.presentClass && formik.errors.presentClass ? inputFocusStyle : inputStyle}
          />
          {formik.touched.presentClass && formik.errors.presentClass && <div>{formik.errors.presentClass}</div>}
        </div>

        {/* Fee Inputs */}
        <div>
          <label>Term 1 Fee</label>
          <input
            type="number"
            {...formik.getFieldProps("term1Fee")}
            style={formik.touched.term1Fee && formik.errors.term1Fee ? inputFocusStyle : inputStyle}
          />
          {formik.touched.term1Fee && formik.errors.term1Fee && <div>{formik.errors.term1Fee}</div>}
        </div>

        <div>
          <label>Term 2 Fee</label>
          <input
            type="number"
            {...formik.getFieldProps("term2Fee")}
            style={formik.touched.term2Fee && formik.errors.term2Fee ? inputFocusStyle : inputStyle}
          />
          {formik.touched.term2Fee && formik.errors.term2Fee && <div>{formik.errors.term2Fee}</div>}
        </div>

        <div>
          <label>Term 3 Fee</label>
          <input
            type="number"
            {...formik.getFieldProps("term3Fee")}
            style={formik.touched.term3Fee && formik.errors.term3Fee ? inputFocusStyle : inputStyle}
          />
          {formik.touched.term3Fee && formik.errors.term3Fee && <div>{formik.errors.term3Fee}</div>}
        </div>

        {/* File Uploads */}
        <div {...getPhotoProps()} style={dragDropStyles}>
          <input {...getPhotoInputProps()} />
          <p>Drag 'n' drop a photo here, or click to select one</p>
        </div>
        {file && <div>Uploaded file: {file.name}</div>}
        {filePreview && <img src={filePreview} alt="Preview" style={{ width: "100px", height: "100px" }} />}

        <div {...getTCProps()} style={dragDropStyles}>
          <input {...getTCInputProps()} />
          <p>Upload Transfer Certificate (PDF)</p>
        </div>
        {tcFile && <div>Uploaded TC: {tcFile.name}</div>}

        <div {...getAadhaarProps()} style={dragDropStyles}>
          <input {...getAadhaarInputProps()} />
          <p>Upload Aadhaar Card (PDF)</p>
        </div>
        {aadhaarFile && <div>Uploaded Aadhaar: {aadhaarFile.name}</div>}

        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>

      {/* View Formats (Grid, Table, List) */}
      <div style={{ width: "40%", padding: "10px" }}>
        <h3>Student List</h3>
        <button onClick={() => handleViewChange("grid")} style={buttonStyle}>
          Grid View
        </button>
        <button onClick={() => handleViewChange("table")} style={buttonStyle}>
          Table View
        </button>
        <button onClick={() => handleViewChange("list")} style={buttonStyle}>
          List View
        </button>

        {viewFormat === "grid" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {students.map((student, index) => (
              <div key={index} style={gridItemStyle}>
                <h4>{student.firstName} {student.lastName}</h4>
                <p>Parent: {student.parentName}</p>
                <p>Previous Class: {student.previousClass}</p>
                <p>Present Class: {student.presentClass}</p>
                <p>TC: {student.tcFile ? student.tcFile.name : "N/A"}</p>
                <p>Aadhaar: {student.aadhaarFile ? student.aadhaarFile.name : "N/A"}</p>
              </div>
            ))}
          </div>
        )}

        {viewFormat === "table" && (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Parent</th>
                <th>Previous Class</th>
                <th>Present Class</th>
                <th>TC</th>
                <th>Aadhaar</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.firstName} {student.lastName}</td>
                  <td>{student.parentName}</td>
                  <td>{student.previousClass}</td>
                  <td>{student.presentClass}</td>
                  <td>{student.tcFile ? student.tcFile.name : "N/A"}</td>
                  <td>{student.aadhaarFile ? student.aadhaarFile.name : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {viewFormat === "list" && (
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {students.map((student, index) => (
              <li key={index} style={{ margin: "10px 0" }}>
                <h4>{student.firstName} {student.lastName}</h4>
                <p>Parent: {student.parentName}</p>
                <p>Previous Class: {student.previousClass}</p>
                <p>Present Class: {student.presentClass}</p>
                <p>TC: {student.tcFile ? student.tcFile.name : "N/A"}</p>
                <p>Aadhaar: {student.aadhaarFile ? student.aadhaarFile.name : "N/A"}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FormComponent;

// CSS-in-JS styles
const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "90%",
  margin: "0 auto",
};

const inputStyle = {
  padding: "8px",
  margin: "10px 0",
  width: "100%",
};

const inputFocusStyle = {
  padding: "8px",
  margin: "10px 0",
  width: "100%",
  border: "2px solid red",
};

const dragDropStyles = {
  border: "2px dashed #cccccc",
  padding: "20px",
  textAlign: "center",
  margin: "10px 0",
};

const gridItemStyle = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "5px",
  textAlign: "center",
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  margin: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
