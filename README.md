# **Deep Learning-Based Bird Species Classification with Integrated Website**

## **Introduction**
Birds are integral to ecosystems, acting as pollinators, seed dispersers, and bio-indicators. Identifying bird species manually can be challenging due to subtle variations in size, plumage, and beak structure. Traditional identification methods require expert knowledge, are time-consuming, and often inaccessible to beginners.

This project addresses these challenges by developing a **deep learning-powered bird species classification model** integrated into an **interactive website**. Leveraging the **InceptionV3** architecture with transfer learning, the system achieves high classification accuracy while ensuring a user-friendly interface for real-time predictions.

---

## **Objectives**
The primary aim of this project is to design and deploy a high-performance AI-powered tool that can accurately classify bird species from images. Specific objectives include:

- Develop a robust CNN-based classification model using **InceptionV3** and transfer learning.
- Train and fine-tune the model to recognize **525 bird species** with high accuracy.
- Build an **interactive, responsive web application** using Flask, HTML, CSS, and JavaScript.
- Enable real-time bird species predictions from user-uploaded images.
- Provide additional features such as:
  - Dataset visualization.
  - Project documentation access.
  - Bird species information retrieval.
- Ensure accessibility for both technical and non-technical users, including birdwatchers, students, and researchers.

---

## **Proposed System**
The proposed system is a combination of **deep learning model development** and **full-stack web deployment**:

### **Core AI Model**
- Built using **TensorFlow/Keras** with InceptionV3 as the backbone.
- Transfer learning applied to leverage pretrained ImageNet weights.
- Fine-tuned for bird-specific features.

### **Frontend Interface**
- Vertical scrolling website with sections: **Home, Predict, Results, Contact**.
- Image upload functionality with drag-and-drop support.
- Bird species list with direct Google Image search integration.

### **Backend Architecture**
- Flask-based API serving predictions.
- Secure image preprocessing and inference pipeline.
- Integration with Wikipedia API for species information.

### **User Experience Enhancements**
- Confidence score display.
- Informative species descriptions.
- Direct links to team profiles.

---

## **Working Methodology**
1. **Problem Understanding**  
   Identified the challenge of fine-grained bird species classification and the need for a public-access tool.

2. **Dataset Preparation**  
   - Dataset: 525 species, ~50,000 images.
   - Organized into **train**, **validation**, and **test** directories.
   - Preprocessing:  
     - Resize to **300×300** pixels.  
     - Normalize pixel values to [0, 1].  
     - Minimal augmentation for baseline (rotation, flipping, zoom planned for future).

3. **Model Development**  
   - Base model: InceptionV3 without top layers.
   - Added **GlobalAveragePooling2D** and dense softmax layer for classification.
   - Phase 1: Freeze base layers, train new layers.  
   - Phase 2: Unfreeze top layers for fine-tuning at a lower learning rate.

4. **Evaluation**  
   - Metrics: Accuracy, Precision, Recall, F1-score.
   - Visual monitoring of training/validation curves.
   - Achieved ~94% top-1 accuracy, ~98% top-5 accuracy.

5. **Deployment**  
   - Model saved in `.h5` format.
   - Flask backend serving predictions.
   - Integrated into a responsive, mobile-friendly frontend.

---

## **Data Standards**
- **Organization:** Train/Valid/Test directories with species-named subfolders.
- **Naming Conventions:** Underscore-separated names (e.g., `Black_footed_Albatross`).
- **Image Processing:**  
  - Uniform size (300×300, RGB).  
  - Normalized pixel values.
- **Label Encoding:** Folder names mapped to numerical class indices.
- **Ethics & Licensing:** Publicly available dataset for academic use.

---

## **Software, Tools, and Libraries Used**
- **Programming Language:** Python 3.11
- **Deep Learning Framework:** TensorFlow 2.15, Keras API
- **Data Handling:** NumPy, Pandas, OpenCV
- **Visualization:** Matplotlib, Seaborn
- **Web Framework:** Flask
- **Frontend:** HTML5, CSS3, JavaScript

---

## **Results**
- **Baseline Accuracy:** 92.38% (frozen base model).
- **Final Accuracy after Fine-tuning:** ~94% (loss reduced from 0.275 to 0.198).
- **Top-5 Accuracy:** ~98%.
- **Key Observations:**
  - Misclassifications mainly among visually similar species.
  - Model generalizes well across varied backgrounds.
  - Grad-CAM analysis confirmed focus on bird features.

---

## **Conclusion**
This project demonstrates the practical application of deep learning in **biodiversity monitoring** and **wildlife conservation**. By combining advanced CNN architectures with a user-friendly website, the system bridges the gap between AI research and real-world usability.

**Future enhancements include:**
- Adding more diverse datasets (rare species, challenging conditions).
- Integrating geolocation-based filtering.
- Developing a multilingual mobile app.
- Deploying on cloud platforms with GPU-backed inference.

---

## **Project Demo Video**
🎥 <a href="https://youtu.be/vwoNxNZopgE" target="_blank">**Click here to watch the demo**</a>

---

## **Installation & Run Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/MrPavan02/Deep-Learning-Based-Bird-Species-Classification-with-Integrated-Website.git
cd "update the path as needed"
```

### **2. Create & Activate Virtual Environment**
```bash
python -m venv venv
```

### **3. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **4. Create a directory named 'trash' inside the 'static' folder:**
``` bash
<Project_Main_Folder>/static/trash
```

### **5. Ensure the project directory structure matches the structure below:**
```bash
BSC_SDP/
├── __pycache__/                              # Python bytecode cache
├── model/                                    # Contains model and prediction logic
│ ├── __pycache__/                            # Python bytecode cache
│ ├── class_names.txt                         # Text file with class labels (bird species)
│ ├── model.h5                                # Trained deep learning model (InceptionV3)
│ └── predict.py                              # Script to make predictions using the model
├─── static/                                  # Static assets (CSS and JavaScript)
│   ├── css/
│   │  ├── report_style.css                   # Styles for project report page
│   │  ├── result_style.css                   # Styles for result page
│   │  ├── show_birds.css                     # Styles for show birds page
│   │  └── style.css                          # General styles
│   ├── js/
│   │  ├── report_script.js                   # JS for project report interactions
│   │  ├── result_script.js                   # JS for result page logic
│   │  ├── script.js                          # General JavaScript functions
│   │  └── show_birds.js                      # JS for show birds page
│   ├── trash/
│   └── upload/                               # Images are related to website styling
├──── templates/                              # HTML templates rendered by Flask
│   ├── index.html                            # Home page
│   ├── project_report.html                   # Project report display page
│   ├── result.html                           # Prediction result display page
│   └── show_birds.html                       # Page showing bird classifications
├──── app.py                                  # Main Flask application script
├──── README.md                               # Project documentation
└──── requirements.txt                        # Python dependencies

```

### **6. Run the Application**
```bash
python app.py
```

### **7. Access the Website**
```bash
http://127.0.0.1:5000
```


