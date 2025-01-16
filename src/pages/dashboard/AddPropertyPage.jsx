import { useContext, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GlobalContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPropertyPage = () => {
    const [err, setErr] = useState("");

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(GlobalContext);
    const navigate = useNavigate();

    const propertyMutation = useMutation({
        mutationFn: async (newProperty) => {
            return await axiosSecure.post('/properties', newProperty)
        },
        onSuccess: () => {
            toast.success('Property added');
            navigate('/dashboard/my-added-properties');

        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    const handleAddProperty = async (e) => {
        e.preventDefault();

        const form = e.target;
        const minPrice = Number(form.minPrice.value);
        const maxPrice = Number(form.maxPrice.value);
        const propertyTitle = form.propertyTitle.value;
        const propertyLocation = form.propertyLocation.value;
        const imageFile = { image: form.image.files[0] }

        if (maxPrice < minPrice) {
            toast.error("Max price has to be greater than min price");
            setErr("Max price has to be greater than min price");
            return
        }

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const newProperty = {
                minPrice,
                maxPrice,
                propertyTitle,
                propertyLocation,
                propertyImage: res.data.data.display_url,
                agentName: user.displayName,
                agentImage: user.photoURL,
                verificationStatus: 'pending',
                agentEmail: user.email
            }
            propertyMutation.mutate(newProperty);
        }


    }

    return (
        <div>
            <div className="flex justify-center items-center min-h-screen p-1">
                <form onSubmit={handleAddProperty} className="card-body max-w-lg shadow-lg rounded-md border border-blue-500">
                    {/* propertyTitle */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Property title</span>
                        </label>
                        <input name="propertyTitle" type="text" className="input input-bordered" required />
                    </div>

                    {/* propertyLocation */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Property Location</span>
                        </label>
                        <input name="propertyLocation" type="text" className="input input-bordered" required />
                    </div>

                    {/* price range */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Min price</span>
                        </label>
                        <input name="minPrice" type="number" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Max price</span>
                        </label>
                        <input name="maxPrice" type="number" className="input input-bordered" required />
                    </div>

                    {/* image */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Property image</span>
                        </label>
                        <input type="file" name="image" className="file-input file-input-primary " required />
                    </div>


                    {/* agent email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Agent email</span>
                        </label>
                        <input name="agentEmail" type="text" className="input input-bordered" readOnly defaultValue={user.email} />
                    </div>

                    {/* agent name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black">Agent name</span>
                        </label>
                        <input name="agentName" type="text" className="input input-bordered" readOnly defaultValue={user.displayName} />
                    </div>

                    {/* error */}
                    {
                        err && <p className="text-lg text-red-500 p-2">{err}</p>
                    }

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add property</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPropertyPage;