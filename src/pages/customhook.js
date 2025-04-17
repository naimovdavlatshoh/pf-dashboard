import { useEffect, useState } from "react";
import { GetDataSimple } from ".."; // kerak bo‘lsa path o‘zgartiring

export const customhook = (url, limit = 6, deps = []) => {
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        GetDataSimple(`${url}?limit=${limit}&page=${page}`).then((res) => {
            setData(res.results ? res.results : res);
            setCount(res.count || 0);
        });
    }, [url, limit, page, status, ...deps]);

    const nextPage = () => {
        if (page < Math.ceil(count / limit)) {
            setPage(page + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const refresh = () => {
        setStatus((prev) => !prev);
    };

    return {
        data,
        count,
        page,
        setPage,
        nextPage,
        prevPage,
        totalPages: Math.ceil(count / limit),
        refresh,
    };
};
