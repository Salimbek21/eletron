import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useTypedDispatch} from "../../../store/hooks/useTypedDispatch";
import {useTypedSelector} from "../../../store/hooks/useTypedSelector";
import {isElementInArray} from "../../../helpers/arrayOperations";

const CompareClasses = () => {

    const router = useRouter()
    const [compareClass, setCompareClass] = useState<string | string[]>("")
    const {fetchCompareClasses} = useTypedDispatch()
    const {classes} = useTypedSelector(state => state.compare)

    useEffect(() => {
        fetchCompareClasses()
    }, [])

    useEffect(() => {
        const queryCompareClass = router.query.compareClass
        if (queryCompareClass) {
            if(!isElementInArray(classes, +queryCompareClass) && classes.length)
                router.push(`/compare?compareClass=${classes[0].id.toString()}`)
            else setCompareClass(queryCompareClass)
        }
        else if (compareClass === '' && classes.length)
            router.push(`/compare?compareClass=${classes[0].id.toString()}`)
    }, [router, classes])

    const filterCompareClasses = () => {
        return classes.map((category, i) => (
            <div
                key={i}
                className={`cat-class ${+compareClass == category.id ? 'active' : ''}`}
                onClick={() => handleClassCompare(category.id.toString())}
            >
                {category.name}
            </div>
        ))
    }

    const handleClassCompare = (compName: string) => {
        router.push(`/compare?compareClass=${compName}`)
    }

    return (
        <div className="container-fluid">
            <div className="compare-classes mb-5">
                {filterCompareClasses()}
            </div>
        </div>
    );
};

export default CompareClasses;