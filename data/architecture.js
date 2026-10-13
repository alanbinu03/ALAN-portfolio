export const architectureStages = [
  {
    id: "data",
    label: "DATA",
    title: "Data",
    detail:
      "Cameras, documents, telemetry, logs, and human feedback — the raw signals a system has to understand.",
  },
  {
    id: "ingestion",
    label: "INGESTION",
    title: "Ingestion",
    detail:
      "Capture, validation, chunking, and storage so downstream stages receive consistent inputs.",
  },
  {
    id: "processing",
    label: "PROCESSING",
    title: "Processing",
    detail:
      "Cleaning, embeddings, feature extraction, and indexing — turning raw input into model-ready representations.",
  },
  {
    id: "model",
    label: "MODEL / LLM",
    title: "Model / LLM",
    detail:
      "Detectors, classifiers, language models, or VLA policies selected and evaluated for the task.",
  },
  {
    id: "agent",
    label: "AGENT / ORCHESTRATION",
    title: "Agent / Orchestration",
    detail:
      "Planning, tool use, memory, routing, and control loops that turn model output into actions.",
  },
  {
    id: "api",
    label: "API",
    title: "API",
    detail:
      "Stable interfaces, auth, rate limits, and contracts between intelligence and product surfaces.",
  },
  {
    id: "application",
    label: "APPLICATION",
    title: "Application",
    detail:
      "Operator consoles, robot runtimes, dashboards, and user-facing products that consume the system.",
  },
  {
    id: "monitoring",
    label: "MONITORING",
    title: "Monitoring",
    detail:
      "Latency, drift, retrieval quality, safety events, and feedback loops that keep the system honest.",
  },
];

export default architectureStages;
