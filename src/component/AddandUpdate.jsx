import React from "react";
import Modal from "./Modal";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Field, Form, Formik } from "formik";
import { db } from "../config/firebase";
import { addDoc, collection, deleteDoc, updateDoc,doc } from "firebase/firestore";

const contactSchemaValidation = Yup.object().shape({
    name:Yup.string().required("Name is required"),
    email:Yup.string().email("invalid email").required("Email is required"),
}) 
const AddandUpdate = ({ IsOpen, Onclose, isupdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contactus");
      await addDoc(contactRef, contact);
      Onclose()
      toast.success("Added successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateContact = async (contact,id) => {
    try {
      const contactRef = doc(db, "contactus",id);
      await updateDoc(contactRef, contact);
      Onclose()
      toast.success("updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={IsOpen} onClose={Onclose}>
        <Formik
        validationSchema={contactSchemaValidation}
          initialValues={
            isupdate
              ? { name: contact.name, email: contact.email }
              : { name: "", email: "" }
          }
          onSubmit={(values) => {
            console.log(values);
            isupdate? UpdateContact(values,contact.id):
            addContact(values);
          }}
        >
          <Form>
            <div id="form" className="flex flex-col gap-1 m-2">
              <label htmlFor="name">Name</label>
              <Field name="name" className="name" required />
        
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="email" required />
            </div>
            <div>
              <button className="btn-form" type="submit">
                {isupdate ? "Update" : "Add"} contact
              </button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddandUpdate;
