// "use client" ensures client-side rendering for the form
"use client";

import React, { useState } from "react";
import { useUser } from "@/hooks/useUser";
import styles from "./employees.module.css";

// Premium, glass‑morphic form for adding a new employee
export default function NewEmployeePage() {
    const { user, loading } = useUser();
    const isAuthorized = ["HR_MANAGER", "SUPER_ADMIN"].includes(user?.role ?? "");

    // Basic employee info
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    // Document uploads – stored as File objects (multiple where needed)
    const [aadharFile, setAadharFile] = useState<File | null>(null);
    const [panFile, setPanFile] = useState<File | null>(null);
    const [marksFiles, setMarksFiles] = useState<File[]>([]);
    const [idFile, setIdFile] = useState<File | null>(null); // passport / voter‑id
    const [experienceFile, setExperienceFile] = useState<File | null>(null);

    // Bank details
    const [bankAccount, setBankAccount] = useState("");
    const [bankName, setBankName] = useState("");
    const [ifsc, setIfsc] = useState("");

    // Additional employee info
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [currentAddress, setCurrentAddress] = useState("");
    const [sameAsCurrent, setSameAsCurrent] = useState(false);
    const [permanentAddress, setPermanentAddress] = useState("");
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [qualification, setQualification] = useState("");
    const [college, setCollege] = useState("");
    const [yearOfPassing, setYearOfPassing] = useState("");
    const [employmentType, setEmploymentType] = useState("");
    const [yearsExperience, setYearsExperience] = useState("");
    const [previousCompanies, setPreviousCompanies] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const [emergencyName, setEmergencyName] = useState("");
    const [emergencyNumber, setEmergencyNumber] = useState("");
    const [emergencyRelation, setEmergencyRelation] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");

    // Simple submit – in a real app this would POST to an API
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            firstName,
            lastName,
            email,
            mobile,
            dob,
            gender,
            currentAddress,
            permanentAddress: sameAsCurrent ? currentAddress : permanentAddress,
            documents: {
                aadhar: aadharFile?.name ?? "",
                pan: panFile?.name ?? "",
                marksCards: marksFiles.map(f => f.name),
                idProof: idFile?.name ?? "",
                experienceLetter: experienceFile?.name ?? "",
                photo: photoFile?.name ?? "",
            },
            education: {
                qualification,
                college,
                yearOfPassing,
                marksCards: marksFiles.map(f => f.name),
            },
            employment: {
                employmentType,
                yearsExperience: employmentType === 'Fresher' ? "N/A" : yearsExperience,
                previousCompanies: employmentType === 'Fresher' ? "N/A" : previousCompanies,
                experienceLetter: experienceFile?.name ?? "",
            },
            bankDetails: { bankAccount, bankName, ifsc, accountHolder },
            emergencyContact: {
                name: emergencyName,
                number: emergencyNumber,
                relation: emergencyRelation,
                bloodGroup,
            },
        };
        console.log("🧾 New employee payload:", payload);
        alert("Employee data logged to console – replace with real API call.");
    };

    // Render loading state first – after all hooks have been declared
    if (loading) {
        return (
            <div className="p-20 text-center text-xs font-black uppercase tracking-widest text-slate-400">
                Loading user data…
            </div>
        );
    }

    // Unauthorized view
    if (!isAuthorized) {
        return (
            <div className={styles.unauth}>🚫 You do not have permission to add employees.</div>
        );
    }

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Add New Employee</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* 1️⃣ Basic Personal Information */}
                <div className={styles.sectionHeader}>Basic Personal Information</div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>First Name</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>Last Name</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                </div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>Personal Email ID</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>Mobile Number</label>
                        <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} required />
                    </div>
                </div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>Date of Birth</label>
                        <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>Gender</label>
                        <select value={gender} onChange={e => setGender(e.target.value)} required>
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className={styles.fieldGroup}>
                    <label>Current Address</label>
                    <textarea value={currentAddress} onChange={e => setCurrentAddress(e.target.value)} required rows={3} />
                </div>
                <div className={styles.fieldGroup}>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={sameAsCurrent} onChange={e => setSameAsCurrent(e.target.checked)} />
                        Same as current address
                    </label>
                </div>
                {!sameAsCurrent && (
                    <div className={styles.fieldGroup}>
                        <label>Permanent Address</label>
                        <textarea value={permanentAddress} onChange={e => setPermanentAddress(e.target.value)} required rows={3} />
                    </div>
                )}

                {/* 2️⃣ Identity & Compliance Documents */}
                <div className={styles.sectionHeader}>Identity & Compliance Documents</div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>Aadhaar Card (PDF/Image)</label>
                        <input type="file" accept=".pdf,.jpg,.png" onChange={e => setAadharFile(e.target.files?.[0] ?? null)} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>PAN Card (PDF/Image)</label>
                        <input type="file" accept=".pdf,.jpg,.png" onChange={e => setPanFile(e.target.files?.[0] ?? null)} required />
                    </div>
                </div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>Passport / Voter ID (PDF/Image)</label>
                        <input type="file" accept=".pdf,.jpg,.png" onChange={e => setIdFile(e.target.files?.[0] ?? null)} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>Photograph (passport‑size)</label>
                        <input type="file" accept=".jpg,.png" onChange={e => setPhotoFile(e.target.files?.[0] ?? null)} required />
                    </div>
                </div>

                {/* 3️⃣ Education Details */}
                <div className={styles.sectionHeader}>Education Details</div>
                <div className={styles.fieldGroup}>
                    <label>Highest Qualification</label>
                    <input type="text" value={qualification} onChange={e => setQualification(e.target.value)} required />
                </div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>University / College Name</label>
                        <input type="text" value={college} onChange={e => setCollege(e.target.value)} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>Year of Passing</label>
                        <input type="number" min="1900" max="2100" value={yearOfPassing} onChange={e => setYearOfPassing(e.target.value)} required />
                    </div>
                </div>
                <div className={styles.fieldGroup}>
                    <label>Markscards (multiple files)</label>
                    <input type="file" multiple accept=".pdf,.jpg,.png" onChange={e => setMarksFiles(Array.from(e.target.files ?? []))} />
                </div>

                {/* 4️⃣ Employment Details */}
                <div className={styles.sectionHeader}>Employment Details</div>
                <div className={styles.fieldGroup}>
                    <label>Employment Type</label>
                    <select value={employmentType} onChange={e => setEmploymentType(e.target.value)} required>
                        <option value="">Select</option>
                        <option value="Fresher">Fresher</option>
                        <option value="Experienced">Experienced</option>
                    </select>
                </div>
                {employmentType === 'Experienced' && (
                    <>
                        <div className={styles.gridTwo}>
                            <div className={styles.fieldGroup}>
                                <label>Total Years of Experience</label>
                                <input type="number" min="0" step="0.1" value={yearsExperience} onChange={e => setYearsExperience(e.target.value)} />
                            </div>
                            <div className={styles.fieldGroup}>
                                <label>Previous Company Name(s)</label>
                                <input type="text" value={previousCompanies} onChange={e => setPreviousCompanies(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.fieldGroup}>
                            <label>Experience Letter (PDF)</label>
                            <input type="file" accept=".pdf,.jpg,.png" onChange={e => setExperienceFile(e.target.files?.[0] ?? null)} />
                        </div>
                    </>
                )}

                {/* 5️⃣ Bank & Payroll Information */}
                <div className={styles.sectionHeader}>Bank & Payroll Information</div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>Bank Account Number</label>
                        <input type="text" value={bankAccount} onChange={e => setBankAccount(e.target.value)} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>IFSC Code</label>
                        <input type="text" value={ifsc} onChange={e => setIfsc(e.target.value)} required />
                    </div>
                </div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>Bank Name</label>
                        <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} required />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>Account Holder Name</label>
                        <input type="text" value={accountHolder} onChange={e => setAccountHolder(e.target.value)} required />
                    </div>
                </div>

                {/* 6️⃣ Additional (Optional) */}
                <div className={styles.sectionHeader}>Additional Information</div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>Emergency Contact Name</label>
                        <input type="text" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>Emergency Contact Number</label>
                        <input type="tel" value={emergencyNumber} onChange={e => setEmergencyNumber(e.target.value)} />
                    </div>
                </div>
                <div className={styles.gridTwo}>
                    <div className={styles.fieldGroup}>
                        <label>Relationship</label>
                        <input type="text" value={emergencyRelation} onChange={e => setEmergencyRelation(e.target.value)} />
                    </div>
                    <div className={styles.fieldGroup}>
                        <label>Blood Group (optional)</label>
                        <input type="text" value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} placeholder="e.g., A+, O-" />
                    </div>
                </div>

                <button type="submit" className={styles.submitBtn}>🚀 Onboard Employee</button>
            </form>
        </section>
    );
}
