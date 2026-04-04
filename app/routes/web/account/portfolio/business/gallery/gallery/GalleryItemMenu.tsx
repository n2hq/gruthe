import React, { useEffect, useState } from 'react'
import EditPhotoDialog from './EditPhotoDialog'
import { useEditPhotoDialogContext } from '~/context/EditPhotoDialogContext'
import { useNotification } from '~/context/NotificationContext'

const GalleryItemMenu = ({
    item,
    menu,
    userGuid,
    businessGuid,
    openImg,
    setOpenImg,
    itemIndex,
    onImageUpdate
}: any) => {
    const [dialog, setDialog] = useState<any>(false)
    const [imgSrc, setImgSrc] = useState<any>(null)
    const editPhoto = useEditPhotoDialogContext()
    const notification = useNotification()
    const IMG_BASE_STORAGE = import.meta.env.VITE_IMG_BASE_STORAGE

    console.log(openImg)


    const handleOpenDialog = (openImg: any, setOpenImg: any) => {

        editPhoto.setOnImageUpdate(() => onImageUpdate)
        editPhoto.setItemIndex(itemIndex)

        editPhoto.setDialog(true)
        editPhoto.setImgSrc(IMG_BASE_STORAGE + item.image_url)
        editPhoto.setImageTitle(item.image_title)
        editPhoto.setUserGuid(userGuid)
        editPhoto.setBusinessGuid(businessGuid)
        editPhoto.setImageGuid(item.image_guid)
        editPhoto.setOpenImg(openImg)
        setDialog(true)
    }

    const handleDelete = async () => {
        //notification.notify()
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        editPhoto.deletePhoto(userGuid, businessGuid, item.image_guid)

    }

    const handleCloseDialog = () => {
        setDialog(false)
        setImgSrc(null)
    }

    return (
        <div className=''>
            {
                menu &&
                <div className={` absolute top-2 right-2 w-[80%] bg-white
                rounded-[12px] overflow-hidden border-[1px] border-white
                shadow-md`}>
                    <div className={`mt-3`}>
                        <div className={` divide-y-[1px]`}>
                            <div
                                onMouseDown={() => handleOpenDialog(openImg, setOpenImg)}
                                className={`py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`}>
                                Edit
                            </div>
                            <div
                                onMouseDown={handleDelete}
                                className={`py-1 hover:bg-gray-300 w-full
                                flex flex-col
                                px-2 transition duration-1000 ease-in-out`}>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default GalleryItemMenu
