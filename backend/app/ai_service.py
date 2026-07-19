import os
import httpx

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "llama-3.1-8b-instant"


async def ai_validate_commission(commission_data: dict) -> dict:
    if not GROQ_API_KEY:
        return fallback_validation(commission_data)

    prompt = f"""You are a commission validation AI for an enterprise with 4000+ employees.
Analyze this commission calculation and identify anomalies, risks, or issues.

Commission Data:
- Employee: {commission_data.get('employee_name', 'Unknown')}
- Role: {commission_data.get('role', 'Unknown')}
- Achievement: {commission_data.get('achievement', 0)}%
- Base Commission: ₹{commission_data.get('base_commission', 0):,.0f}
- Accelerator: ₹{commission_data.get('accelerator', 0):,.0f}
- Net Commission: ₹{commission_data.get('net_commission', 0):,.0f}
- Cap: ₹{commission_data.get('cap', 0):,.0f}
- Plan Type: {commission_data.get('plan_type', 'Unknown')}

Respond in JSON format with:
{{
  "is_anomaly": true/false,
  "severity": "high"/"medium"/"low",
  "issues": ["list of issues found"],
  "recommendation": "what action to take",
  "confidence": 0.0 to 1.0
}}"""

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                GROQ_URL,
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": MODEL,
                    "messages": [
                        {"role": "system", "content": "You are a commission anomaly detection AI. Respond only in valid JSON."},
                        {"role": "user", "content": prompt},
                    ],
                    "temperature": 0.2,
                    "max_tokens": 512,
                },
            )
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            import json
            try:
                return json.loads(content)
            except json.JSONDecodeError:
                return {"is_anomaly": False, "severity": "low", "issues": [], "recommendation": content, "confidence": 0.7}
    except Exception as e:
        return fallback_validation(commission_data)


async def ai_chat(message: str, context: str = "") -> str:
    if not GROQ_API_KEY:
        return f"AI is not configured. Please set GROQ_API_KEY. You asked: {message}"

    system_prompt = """You are CommissionEngine AI, an intelligent assistant for commission management.
You help with:
- Commission calculation queries
- Plan configuration advice
- Anomaly explanations
- Performance insights
- Dispute resolution guidance

Be concise, helpful, and data-driven in your responses.
Format currency in Indian Rupees (₹)."""

    if context:
        system_prompt += f"\n\nContext:\n{context}"

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                GROQ_URL,
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": MODEL,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": message},
                    ],
                    "temperature": 0.3,
                    "max_tokens": 1024,
                },
            )
            data = response.json()
            return data["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error connecting to AI service: {str(e)}"


def fallback_validation(commission_data: dict) -> dict:
    issues = []
    severity = "low"
    is_anomaly = False

    achievement = commission_data.get("achievement", 0)
    net = commission_data.get("net_commission", 0)
    cap = commission_data.get("cap", 0)

    if achievement > 150:
        issues.append(f"Achievement {achievement}% significantly above average")
        severity = "medium"
        is_anomaly = True

    if cap > 0 and net >= cap * 0.95:
        issues.append("Commission near or at cap limit")
        severity = "high"
        is_anomaly = True

    if net > 200000:
        issues.append(f"High commission amount: ₹{net:,.0f}")
        severity = "medium"
        is_anomaly = True

    if achievement < 50 and net > 0:
        issues.append("Commission paid despite very low achievement")
        severity = "high"
        is_anomaly = True

    return {
        "is_anomaly": is_anomaly,
        "severity": severity,
        "issues": issues,
        "recommendation": "Review flagged items before approval" if is_anomaly else "No action required",
        "confidence": 0.85,
    }
