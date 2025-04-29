import * as React from "react";

export default function PhotoCard({ loading, error, data }) {
  if (error) return <div>{error}</div>;

  if (loading || !data) return <div className="card loading">Loading...</div>;

  return (
    <div className="card">
      <img
        src={data.url}
        alt={data.description || "photo"}
        style={{ width: "100%", borderRadius: "12px" }}
      />
      <div className="caption">
        <h4>{data.description || "Untitled"}</h4>
        <p>📷 {data.user?.name ? data.user.name : data.user}</p>
      </div>
    </div>
  );
}
