import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const AdvertisePropertyPage = () => {
    const axiosSecure = useAxiosSecure();

    const fetchVerifiedProperties = async () => {
        const { data } = await axiosSecure.get('/properties');
        return data;
    }

    const { data: advertiseProperties, isFetching, refetch } = useQuery({
        queryKey: ["advertiseProperties"],
        queryFn: () => fetchVerifiedProperties()
    });

    const makeAdvertise = useMutation({
        mutationFn: async (advertise) => {
            return await axiosSecure.patch(`/advertise-property/${advertise.propertyId}?advertise=${advertise.advertise}`);
        },
        onSuccess: () => {
            toast.success('Property advertised status changed successfully');
            refetch()
        },
        onError: () => {
            toast.error('An error occured');
        }
    })

    const handleAdvertise = (advertise) => {
        makeAdvertise.mutate(advertise);
    }

    if (isFetching) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Property image</th>
                            <th>Property title</th>
                            <th>Agent name</th>
                            <th>Price range</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            advertiseProperties.map((op, idx) => {
                                return (
                                    <tr key={op._id}>
                                        <th>{idx + 1}</th>
                                        <td>
                                            <img
                                                className="w-[50px]"
                                                src={op.propertyImage} alt="" />
                                        </td>
                                        <td>{op.propertyTitle}</td>
                                        <td>{op.agentName}</td>
                                        <td>{op.minPrice} - {op.maxPrice}</td>
                                        <td>{op.verificationStatus}</td>
                                        {/* <td><button onClick={() => handleAdvertise({ ...op })} className="btn bg-purple-500 p-1">Advertise</button></td> */}
                                        <td>
                                            {
                                                op.advertise === 'yes' ? <button onClick={() => handleAdvertise({propertyId: op._id, advertise: 'no'})} className="btn bg-rose-500 p-1">Cancel advertise</button>
                                                    :
                                                    <button onClick={() => handleAdvertise({propertyId: op._id, advertise: 'yes'})} className="btn bg-purple-500 p-1">Advertise</button>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertisePropertyPage;