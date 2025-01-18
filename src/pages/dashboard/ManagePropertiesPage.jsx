import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const ManagePropertiesPage = () => {
    const axiosSecure = useAxiosSecure();


    const fetchAllProperties = async () => {
        const { data } = await axiosSecure.get(`/all-properties`);
        return data;
    };

    const { data: allProperties, isFetching, refetch } = useQuery({
        queryKey: ["allProperties"],
        queryFn: () => fetchAllProperties()
    });

    const verifyProperty = useMutation({
        mutationFn: async ({ propertyId, verify }) => {
            return await axiosSecure.patch(`/property-verify/${propertyId}?verify=${verify}`)
        },
        onSuccess: () => {
            toast.success('Property verification status changed');
            refetch();
        },
        onError: () => {
            toast.error('An error occured');
        }
    });

    if (isFetching) {
        return <Loading></Loading>
    }

    const handleVerify = (propertyId, verify) => {
        verifyProperty.mutate({ propertyId, verify });
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Property title</th>
                        <th>Property location</th>
                        <th>Agent email</th>
                        <th>Agent name</th>
                        <th>Price range</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProperties.map((op, idx) => {
                            return (
                                <tr key={op._id}>
                                    <th>{idx + 1}</th>
                                    <td>{op.propertyTitle}</td>
                                    <td>{op.propertyLocation}</td>
                                    <td>{op.agentEmail}</td>
                                    <td>{op.agentName}</td>
                                    <td>{op.minPrice} - {op.maxPrice}</td>
                                    <td>{op.verificationStatus === 'pending' ?
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleVerify(op._id, 'accept')} className="btn bg-green-500 p-1">Accept</button>
                                            <button onClick={() => handleVerify(op._id, 'reject')} className="btn bg-rose-500 p-1">Reject</button>
                                        </div> :
                                        op.verificationStatus}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManagePropertiesPage;