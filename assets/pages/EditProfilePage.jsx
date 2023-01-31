import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import LogosAPI from '../services/logosAPI';
import UsersAPI from '../services/usersAPI';

const EditProfilePage = () => {

    const jwtData = jwtDecode(window.localStorage.getItem("authToken"));
    const id = jwtData.userId;
    const [user, setUser]= useState({
        firstName: "",
        lastName: "",
        email: "",
        company:"",
        siret:"",
        adresse:"",
        phone:""
        
    });
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        company:"",
        siret:"",
        adresse:"",
        phone:""
        
    });
    let navigate = useNavigate();


    const fetchUser = async id => {
        try {
            
            const {firstName, lastName, email, company,siret, adresse, phone} = await UsersAPI.find(id);
            
                setUser({firstName, lastName, email, company,siret, adresse, phone})
            
        } catch (error) {
            console.log(error.response)
            toast.error('Impossible de charger les données demandée !')
            navigate('/profile')
        }

    }
        
  

    useEffect(() => {
             
            fetchUser(id);   

    }, [id])
    

     //gestion des inputs dans le form
     const handleChange = ({ currentTarget }) => {
        const {name, value } = currentTarget;
        


        //gestion du nom du logo
        // const extention = user.logo.split(".").pop();
        //     function makeid(length) {
        //         var result           = '';
        //         var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        //         var charactersLength = characters.length;
        //         for ( var i = 0; i < length; i++ ) {
        //           result += characters.charAt(Math.floor(Math.random() * 
        //      charactersLength));
        //        }
        //        return result;
        //     }
            
            
                
        //         const logoname = makeid(5)+"."+ extention;
        //         console.log(logoname)


        setUser({...user, [name]: value});
        
        console.log(user)
    }
    const handleChangeFile = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
       
	};
    console.log(isFilePicked)
    console.log(selectedFile)
    

    //Gestion de la soumission du form
    const handleSubmit = async e => {
        e.preventDefault();
        

        try {
            
           console.log(user)
                await UsersAPI.update(id, user)
                toast.success("Le profil a bien été modifié.")
                setErrors({});
                navigate('/profile')
                
                if (isFilePicked) {
                    const formData = new FormData();

		            formData.append('file', selectedFile);

                    await LogosAPI.create(formData)

                    await UsersAPI.update(id, user)
                    toast.success("Le profil a bien été modifié.")
                    setErrors({});
                    navigate('/profile');

                    
                    
                }else{
                    await UsersAPI.update(id, user)
                    toast.success("Le profil a bien été modifié.")
                    setErrors({});
                    navigate('/profile')

                }
               
            
            
        } catch (error) {
            console.log(error)
            if(error.response.data.violations) {
                const apiErrors ={};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire!")
            }
        }
    }
   
   
   
   
   
   
    return (
        <>
        <h1>Editer mon profil</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    label ="Téléphone" 
                    name ="phone"
                    value = {user.phone}
                    onChange={handleChange}
                    placeholder="Votre numéro de téléphone"
                    error = {errors.phone}

                />
                 <Field
                    label ="Adresse" 
                    name ="adresse"
                    value = {user.adresse}
                    onChange={handleChange}
                    placeholder="l'adresse de votre entreprise"
                    error = {errors.adresse}

                />
                <Field
                    label ="Entreprise" 
                    name ="company"
                    value = {user.company}
                    onChange={handleChange}
                    placeholder="le nom de votre entreprise"
                    error = {errors.company}

                />
                <Field
                    label ="N° SIRET" 
                    name ="siret"
                    value = {user.siret}
                    onChange={handleChange}
                    placeholder="le n° SIRET de votre entreprise"
                    error = {errors.siret}

                />
                <Field
                    label = "Logo"
                    name="logo"
                    type="file"
                    onChange={handleChangeFile}
                    placeholder="logo de votre entreprise"
                    error = {errors.logo}
                    
                    />
                
                
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    
                </div>
            </form>
            
        </>
    );
};

export default EditProfilePage;