import React, { useState, useRef, useEffect } from 'react';

function CustomLivery() {
  const f1CarModel = process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1-gltf/McLarenTest.gltf';
  const f1aCarModel = process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-gltf/f1a-model-1.gltf';

  const [selectedModel, setSelectedModel] = useState(f1CarModel);
  const modelViewerRef = useRef(null);

  // Define texture options for each model (F1 car based on McLarenTest.gltf and provided textures)
  const f1TextureOptions = {
    body: [
      { name: 'Default', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1-gltf/McLarenTestUV1.png' },
      { name: 'Pink', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1-gltf/McLarenTestUV2.png' },
      { name: 'Blue', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1-gltf/McLarenTestUV3.png' },
    ],
    carbon: [
      { name: 'Default', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1-gltf/carbon_BaseColor.png' },
    ],
    details: [
      { name: 'Default', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1-gltf/details_BaseColor.png' },
    ],
    wheels: [
      { name: 'Default', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1-gltf/Wheels_BaseColor.png' },
    ],
  };

  const f1aTextureOptions = {
    Base_Livery: [
      { name: 'Default', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-gltf/f1a-model-1_Base_UV.png' },
      { name: 'Pink', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-gltf/f1a-model-1_Base_UV_pink.png' },
      { name: 'Blue', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-gltf/f1a-model-1_Base_UV_blue.png' },
    ],
    carbon: [
      { name: 'Default', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-model-shared-textures/carbon.png' },
      { name: 'Dark Carbon', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-model-shared-textures/carbon.png' },
      { name: 'Light Carbon', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-model-shared-textures/carbon.png' },
    ],
    Wheels2: [
      { name: 'Default', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-model-shared-textures/tireUV.png' },
      { name: 'Black Wheels', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-model-shared-textures/tireUV.png' },
      { name: 'Gold Wheels', path: process.env.PUBLIC_URL + '/ArFiles/glbs/customs/f1a-model-shared-textures/tireUV.png' },
    ],
  };

  // Get the appropriate texture options based on selected model
  const textureOptions = selectedModel === f1CarModel ? f1TextureOptions : f1aTextureOptions;

  // State to keep track of selected texture for each material
  const [selectedTextures, setSelectedTextures] = useState(() => {
    const initialTextures = {};
    const currentTextureOptions = selectedModel === f1CarModel ? f1TextureOptions : f1aTextureOptions;
    for (const materialName in currentTextureOptions) {
      if (currentTextureOptions[materialName].length > 0) {
        initialTextures[materialName] = currentTextureOptions[materialName][0].path;
      }
    }
    return initialTextures;
  });

  useEffect(() => {
    const modelViewer = modelViewerRef.current;

    if (!modelViewer) return;

    const onLoad = () => {
      if (modelViewer.model) {
        console.log('Model loaded, applying textures...');
        applyAllTextures();
      } else {
        console.warn('Model not ready yet on load event.');
      }
    };

    modelViewer.addEventListener('load', onLoad);

    return () => {
      modelViewer.removeEventListener('load', onLoad);
    };
  }, [selectedModel]);

  useEffect(() => {
    // Apply textures whenever selectedTextures changes
    applyAllTextures();
  }, [selectedTextures]);

  const applyAllTextures = async () => {
    const modelViewer = modelViewerRef.current;

    if (!modelViewer || !modelViewer.model) {
      console.warn('modelViewer or model is not ready.');
      return;
    }

    console.log('--- Applying Textures ---');
    console.log('modelViewer:', modelViewer);
    console.log('modelViewer.model:', modelViewer.model);

    if (modelViewer.model.ready) {
      await modelViewer.model.ready;
    }
    console.log('Model is ready.');

    if (!modelViewer.model.materials || modelViewer.model.materials.length === 0) {
      console.log('No materials found on the model.');
      return;
    }
    console.log('Model materials:', modelViewer.model.materials);
    console.log('Material names on loaded model:');
    modelViewer.model.materials.forEach((mat, index) => {
      console.log(`Index ${index}: ${mat.name || 'Unnamed Material'}`);
    });

    for (const material of modelViewer.model.materials) {
      const materialName = material.name;
      const texturePath = selectedTextures[materialName];

      if (!texturePath) {
        console.log(`No texture option defined for material: ${materialName}. Skipping.`);
        continue;
      }

      console.log(`Attempting to set texture for material ${materialName}:`);
      console.log(`Texture path: ${texturePath}`);

      try {
        const texture = await modelViewer.createTexture(texturePath);
        console.log('Created texture object:', texture);

        console.log(`Applying texture for material: ${materialName}, path: ${texturePath}`);

        if (material.pbrMetallicRoughness && material.pbrMetallicRoughness.baseColorTexture) {
          material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
          console.log(`Successfully set texture for material ${materialName} using setTexture.`);
        } else {
          console.warn(`Material ${materialName} does not have a baseColorTexture property to modify.`);
        }
      } catch (error) {
        console.error(`Error setting texture for material ${materialName}:`, error);
        console.log('Current material object (in catch):', material);
      }
    }
  };

  const handleTextureChange = (materialName, texturePath) => {
    setSelectedTextures(prev => ({
      ...prev,
      [materialName]: texturePath,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 pb-8 bg-neutral-900 text-white">
      <h1 className="text-4xl font-bold mb-4 gradient-text-light">Custom Livery Creator</h1>
      <p className="text-lg mb-8 text-neutral-300 text-center px-4">Choose your base model and customize its livery by selecting different texture options for various parts of the car.</p>

      <div className="flex flex-row justify-center gap-4 mb-8">
        <button
          className={`py-2 px-6 rounded-md font-bold ${selectedModel === f1CarModel ? 'bg-plum-500 text-white bg-glow-dark-shadow' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => {
            setSelectedModel(f1CarModel);
            setSelectedTextures(() => {
              const initialTextures = {};
              for (const materialName in f1TextureOptions) {
                if (f1TextureOptions[materialName].length > 0) {
                  initialTextures[materialName] = f1TextureOptions[materialName][0].path;
                }
              }
              return initialTextures;
            });
          }}
        >
          F1 Car Model
        </button>
        <button
          className={`py-2 px-6 rounded-md font-bold ${selectedModel === f1aCarModel ? 'bg-plum-500 text-white bg-glow-dark-shadow' : 'bg-gray-700 text-gray-300'}`}
          onClick={() => {
            setSelectedModel(f1aCarModel);
            setSelectedTextures(() => {
              const initialTextures = {};
              for (const materialName in f1aTextureOptions) {
                if (f1aTextureOptions[materialName].length > 0) {
                  initialTextures[materialName] = f1aTextureOptions[materialName][0].path;
                }
              }
              return initialTextures;
            });
          }}
        >
          F1A Car Model
        </button>
      </div>

      <div className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden relative shadow-lg mb-8">
        <model-viewer
          ref={modelViewerRef}
          src={selectedModel}
          alt="3D Car Model"
          camera-controls
          auto-rotate
          shadow-intensity="1"
          shadow-softness="1"
          exposure="1"
          loading="auto"
          ar
          ar-modes="scene-viewer webxr quick-look"
          ar-scale="auto"
        >
          {/* Placeholder for AR Button */}
          <button slot="ar-button" className="ar-button hidden md:flex items-center justify-center rounded-b-lg font-bold font-display drop-shadow-md">
            <img src={process.env.PUBLIC_URL + "/APX/3diconWhite.png"} alt="AR icon" className="w-4 h-4 mr-2"/>
            View in AR
          </button>
        </model-viewer>
      </div>

      {/* Texture Customization Controls */}
      <div className="w-full max-w-4xl p-4 bg-gray-800 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(textureOptions).map(([materialName, textures]) => (
          <div key={materialName} className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-3 gradient-text-light">{materialName.replace(/_/g, ' ')}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {textures.map((option, index) => (
                <button
                  key={index}
                  className={`py-2 px-4 rounded-md text-sm font-medium ${selectedTextures[materialName] === option.path ? 'bg-plum-300 text-white ring-2 ring-plum-500 bg-glow-dark-shadow' : 'bg-gray-700 text-gray-300'}`}
                  onClick={() => handleTextureChange(materialName, option.path)}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomLivery; 