import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GlobalContext } from "../../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const MySoldPropertiesPage = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(GlobalContext);
    const [total, setTotal] = useState(0);

    const fetchSoldProperties = async () => {
        const { data } = await axiosSecure.get(`/offer-bought/${user.email}`);
        return data;
    };

    const { data: soldProperties, isFetching } = useQuery({
        queryKey: ["soldProperties", user.email],
        queryFn: () => fetchSoldProperties()
    });

    useEffect(() => {
        setTotal(soldProperties?.reduce((total, item) => total + item.offeredPrice, 0))
    }, [soldProperties]);

    if (isFetching) {
        return <Loading></Loading>
    }


    return (
        <div>
            <p className="text-center font-semibold text-base md:text-lg text-purple-500 my-5">Total property sold amount: {total}</p>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Property title</th>
                            <th>Property location</th>
                            <th>Buyer email</th>
                            <th>Buyer name</th>
                            <th>Sold price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            soldProperties.map((op, idx) => {
                                return (
                                    <tr key={op._id}>
                                        <th>{idx + 1}</th>
                                        <td>{op.propertyTitle}</td>
                                        <td>{op.propertyLocation}</td>
                                        <td>{op.buyerEmail}</td>
                                        <td>{op.buyerName}</td>
                                        <td>{op.offeredPrice}</td>
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

export default MySoldPropertiesPage;