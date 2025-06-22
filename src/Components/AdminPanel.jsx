import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase/config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signOut, onAuthStateChanged } from "firebase/auth";
import '../assets/Css/AdminPanel.css';

export default function AdminPanel() {

  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    imageFile: null,
    imageUrl: "",
    url: "",
    technologies: "",
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;



  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) window.location.href = "/login";
    });

    fetchProjects();
    return () => unsubscribe();

  }, []);


  const fetchProjects = async () => {
    const snapshot = await getDocs(collection(db, "projects"));
    setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };




  const uploadImageAndGetUrl = async (file) => {
    if (!file) return "";
    setUploading(true);
    const imageRef = ref(storage, `project_images/${Date.now()}_${file.name}`);
    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    setUploading(false);
    return url;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.imageUrl;
    if (form.imageFile) {
      imageUrl = await uploadImageAndGetUrl(form.imageFile);
    }

    const projectData = {
      title: form.title,
      image: imageUrl,
      url: form.url,
      technologies: form.technologies,
    };

    if (editId) {
      await updateDoc(doc(db, "projects", editId), projectData);
      setEditId(null);
    } else {
      await addDoc(collection(db, "projects"), projectData);
    }

    setForm({
      title: "",
      imageFile: null,
      imageUrl: "",
      url: "",
      technologies: "",
    });

    fetchProjects();
  };


  // delete

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
    fetchProjects();
  };



  // Update

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      imageFile: null,
      imageUrl: project.image,
      url: project.url,
      technologies: project.technologies,
    });
    setEditId(project.id);
  };


    // Logout

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };



  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(projects.length / itemsPerPage);



  return (
    <>
      <div className="flex items-center justify-between mb-8 topbr">
        <h2 className="text-2xl font-bold text-gray-800">🛠 Admin Panel</h2>
        <button
          onClick={handleLogout}
          className="bg-[#367088] hover:bg-[#28556a] text-white px-4 py-1.5 rounded-md text-sm shadow"
        >
          Çıxış
        </button>
      </div>

      <div className="flex">

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white  lg: rounded-md shadow-md p-5 space-y-4 border border-gray-100"
        >
          <input 
            placeholder="Başlıq"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="mt-3 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
            className="mt-3 w-full text-sm"
          />
          {form.imageUrl && !form.imageFile && (
            <img
              src={form.imageUrl}
              alt="Preview"
              className="w-[200px] h-[200px]"
            />
          )}
          <input
            placeholder="Layihə linki"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            required
            className="mt-3 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            placeholder="Texnologiyalar"
            value={form.technologies}
            onChange={(e) => setForm({ ...form, technologies: e.target.value })}
            required
            className="mt-3 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={uploading}
            className="mt-3 w-full bg-black hover:bg-blue-700 text-white text-sm py-2 rounded-md transition disabled:opacity-50"
          >
            {uploading ? "Yüklənir..." : editId ? "Yenilə" : "Əlavə et"}
          </button>
        </form>

        {/* Layihə Listi */}
        <div className="w-full lists">
          <ul className="space-y-4">
            {currentProjects.map((project) => (
              <li
                key={project.id}
                className="bg-white h-[146px] p-4 rounded-md shadow-sm flex items-center justify-between gap-4 border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-[193px] h-[100px] object-cover rounded"
                  />
                  <div className="text">
                    <h3 className="title">{project.title}</h3>
                    <p className="text-gray-500">{project.technologies}</p>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Sayta bax
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-3 py-1 rounded"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex gap-2 justify-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Əvvəlki
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Sonrakı
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
