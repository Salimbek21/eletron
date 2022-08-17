import React, {FC} from 'react';
import {Skeleton} from "@material-ui/lab";

interface SkeletonProps {
    count: number,
    type?: string
}

const SkeletonProductCard: FC<SkeletonProps> = ({count, type = "section"}) => {

    const responsiveClass = `${type === 'catalog' ? 'col-lg-3 col-lg-3 col-md-6 col-sm-6'
        : 'col-lg-2-5 col-lg-3 col-md-4 col-sm-6'}`;

    const productSkeletonRenderer = () => {
        let skeletons: any[] = [];
        for (let i = 0; i < count; i++) {
            skeletons = [
                ...skeletons,
                (
                    <div key={`skeleton-product ${i}`}
                         className={responsiveClass}>
                        <div className="product-card skeleton">
                            <Skeleton className="mb-2" variant="rect" width="100%" height={200}/>
                            <Skeleton/>
                            <Skeleton className="mb-2"/>
                            <Skeleton width="60%"/>
                            <div className="d-flex justify-content-between align-items-start">
                                <Skeleton
                                    className="mt-2"
                                    height={70}
                                    width="60%"
                                    style={{borderRadius: 10}}
                                />
                                <Skeleton
                                    className="mt-2"
                                    height={70}
                                    width="25%"
                                    style={{borderRadius: 10}}
                                />
                            </div>
                        </div>
                    </div>
                )
            ]
        }
        return skeletons
    }

    return (
        <>
            {productSkeletonRenderer()}
        </>
    )
};

export default SkeletonProductCard;