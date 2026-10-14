export const projects = [
  {
    slug: "generative-ai-rag-agents",
    name: "Generative AI, RAG, and Agentic Systems",
    category: "Generative AI / Agentic AI",
    shortDescription:
      "Generative AI, RAG, and Agentic AI systems for enterprise knowledge retrieval, multi-agent orchestration, and workflow automation.",
    whatIBuilt:
      "Built Generative AI, RAG, and Agentic AI systems for enterprise knowledge retrieval, multi-agent orchestration, and workflow automation.",
    overview:
      "Generative AI, RAG, and Agentic AI systems for enterprise knowledge retrieval, multi-agent orchestration, and workflow automation.",
    requirements: [
      "Enterprise knowledge retrieval",
      "Multi-agent orchestration",
      "Workflow automation",
    ],
    architecture: [
      { id: "genai", label: "Generative AI" },
      { id: "rag", label: "RAG" },
      { id: "agents", label: "Agentic AI" },
      { id: "retrieval", label: "Knowledge retrieval" },
      { id: "orchestration", label: "Multi-agent orchestration" },
      { id: "workflow", label: "Workflow automation" },
    ],
    stack: ["Generative AI", "RAG", "Agentic AI"],
    status: "April 2025 — Present",
    featured: true,
    github: null,
    demo: null,
    caseStudy: true,
    gallery: [],
  },
  {
    slug: "realtime-computer-vision",
    name: "Real-Time Computer Vision",
    category: "Computer Vision",
    shortDescription:
      "Real-time computer vision systems for object detection, tracking, counting, face recognition, liveness detection, and visual inspection.",
    whatIBuilt:
      "Developed real-time computer vision systems for object detection, tracking, counting, face recognition, liveness detection, and visual inspection.",
    overview:
      "Real-time computer vision for object detection, tracking, counting, face recognition, liveness detection, and visual inspection.",
    requirements: [
      "Object detection",
      "Tracking",
      "Counting",
      "Face recognition",
      "Liveness detection",
      "Visual inspection",
    ],
    architecture: [
      { id: "detect", label: "Object detection" },
      { id: "track", label: "Tracking" },
      { id: "count", label: "Counting" },
      { id: "face", label: "Face recognition" },
      { id: "liveness", label: "Liveness detection" },
      { id: "inspect", label: "Visual inspection" },
    ],
    stack: [
      "Object Detection",
      "Tracking",
      "Counting",
      "Face Recognition",
      "Liveness Detection",
      "Visual Inspection",
    ],
    status: "April 2025 — Present",
    featured: true,
    github: null,
    demo: null,
    caseStudy: true,
    gallery: [],
  },
  {
    slug: "ml-mlops-pipelines",
    name: "ML and MLOps Pipelines",
    category: "MLOps",
    shortDescription:
      "ML/MLOps pipelines covering training, evaluation, experiment tracking, model versioning, deployment, monitoring, drift detection, and retraining.",
    whatIBuilt:
      "Built ML/MLOps pipelines covering training, evaluation, experiment tracking, model versioning, deployment, monitoring, drift detection, and retraining.",
    overview:
      "ML and MLOps pipelines covering training, evaluation, experiment tracking, model versioning, deployment, monitoring, drift detection, and retraining.",
    requirements: [
      "Training",
      "Evaluation",
      "Experiment tracking",
      "Model versioning",
      "Deployment",
      "Monitoring",
      "Drift detection",
      "Retraining",
    ],
    architecture: [
      { id: "train", label: "Training" },
      { id: "eval", label: "Evaluation" },
      { id: "track", label: "Experiment tracking" },
      { id: "version", label: "Model versioning" },
      { id: "deploy", label: "Deployment" },
      { id: "monitor", label: "Monitoring" },
      { id: "drift", label: "Drift detection" },
      { id: "retrain", label: "Retraining" },
    ],
    stack: [
      "Training",
      "Evaluation",
      "Experiment Tracking",
      "Model Versioning",
      "Deployment",
      "Monitoring",
      "Drift Detection",
      "Retraining",
    ],
    status: "April 2025 — Present",
    featured: true,
    github: null,
    demo: null,
    caseStudy: true,
    gallery: [],
  },
  {
    slug: "robot-vision-teleoperation",
    name: "Robot Vision and Teleoperation",
    category: "Robotics / Computer Vision",
    shortDescription:
      "Robot vision and teleoperation platform integrating live camera streaming, AI perception, ROS2 control, browser-based teleoperation, FastAPI, and WebSockets.",
    whatIBuilt:
      "Engineered a robot vision and teleoperation platform integrating live camera streaming, AI perception, ROS2 control, browser-based teleoperation, FastAPI, and WebSockets.",
    overview:
      "A robot vision and teleoperation platform: live camera streaming, AI perception, ROS2 control, browser-based teleoperation, FastAPI, and WebSockets.",
    requirements: [
      "Live camera streaming",
      "AI perception",
      "ROS2 control",
      "Browser-based teleoperation",
      "FastAPI",
      "WebSockets",
    ],
    architecture: [
      { id: "stream", label: "Live camera streaming" },
      { id: "perception", label: "AI perception" },
      { id: "ros2", label: "ROS2 control" },
      { id: "teleop", label: "Browser teleoperation" },
      { id: "fastapi", label: "FastAPI" },
      { id: "ws", label: "WebSockets" },
    ],
    stack: ["ROS2", "FastAPI", "WebSockets"],
    status: "April 2025 — Present",
    featured: true,
    github: null,
    demo: null,
    caseStudy: true,
    gallery: [],
  },
  {
    slug: "humanoid-robotics-vla",
    name: "Humanoid Robotics and Vision-Language-Action",
    category: "Robotics / VLA",
    shortDescription:
      "Humanoid robotics and Vision-Language-Action systems, including multi-camera data collection, manipulation workflows, robot state/action recording, and NVIDIA GR00T-based development.",
    whatIBuilt:
      "Developed humanoid robotics and Vision-Language-Action systems, including multi-camera data collection, manipulation workflows, robot state/action recording, and NVIDIA GR00T-based development.",
    overview:
      "Humanoid robotics and Vision-Language-Action systems: multi-camera data collection, manipulation workflows, robot state/action recording, and NVIDIA GR00T-based development.",
    requirements: [
      "Multi-camera data collection",
      "Manipulation workflows",
      "Robot state/action recording",
      "NVIDIA GR00T-based development",
    ],
    architecture: [
      { id: "cameras", label: "Multi-camera data collection" },
      { id: "manipulation", label: "Manipulation workflows" },
      { id: "recording", label: "State / action recording" },
      { id: "groot", label: "NVIDIA GR00T" },
    ],
    stack: ["NVIDIA GR00T", "Vision-Language-Action"],
    status: "April 2025 — Present",
    featured: true,
    github: null,
    demo: null,
    caseStudy: true,
    gallery: [],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

export default projects;
