import cv from "@techstark/opencv-js";

const img_size = 96;
const edge_offset = 75;

const msize = new cv.Size(30, 30);
let haarCascade;

// helper func to load classifier
const loadData = async (path, url) => {
  // https://docs.opencv.org/4.x/d0/d0f/tutorial_js_object_detection.html
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const data = new Uint8Array(buffer);
  cv.FS_createDataFile("/", path, data, true, false, false);
};

// load classifier to browser
export const loadHaarFaceModels = async () => {
  return loadData(
    "haarcascade_frontalface_alt2.xml",
    "haarcascade_xml/haarcascade_frontalface_alt2.xml"
  )
    .then(
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            haarCascade = new cv.CascadeClassifier();
            haarCascade.load("haarcascade_frontalface_alt2.xml");
            resolve();
          }, 2000);
        })
    )
    .catch((e) => {});
};

export const detectHaarFace = (img) => {
  const grayScaleImg = new cv.Mat();

  // convert to grayscale
  cv.cvtColor(img, grayScaleImg, cv.COLOR_RGBA2GRAY, 0);

  const faces = new cv.RectVector();

  // detect face
  // haarCascade.detectMultiScale(grayScaleImg, faces, 1.4, 3, 0, msize);
  haarCascade.detectMultiScale(grayScaleImg, faces, 1.4, 3, 0);

  if (faces.size() > 0) {
    //   // getting only first face
    //   let rect = new cv.Rect(
    //     faces.get(0).x,
    //     faces.get(0).y,
    //     faces.get(0).width,
    //     faces.get(0).height
    //   );
    img = grayScaleImg.roi(new cv.Rect(100, 100, 200, 200));
    console.log("done");
  }

  grayScaleImg.delete();
  faces.delete();
};
