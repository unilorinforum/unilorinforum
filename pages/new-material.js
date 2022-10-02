import React from 'react';
import NewMaterialsComponent from '../components/newMateralComponent/newMaterials.component';

const NewMaterial = () => {
    return (
        <div>
            <NewMaterialsComponent />
        </div>
    );
}

export default NewMaterial;

NewMaterial.getLayout = function pageLayout(page) {
  return (
    <>
      {page}
    </>
  );
};
