import { useEffect, useState } from "react";

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [allQueries] = useState({
    "How do I return an online order?": "Nike Members and guests can return online orders at most Nike stores or ship their return back to us. Check out our return instructions for more information.",
    "How do I return a Nike store purchase?": "You can take the items you want to return to any Nike store, except Nike Clearance stores.",
    "Do I need a receipt to return items at a Nike store?": "For orders placed on Nike.com or in any of the Nike apps, just have either your order barcode or order number ready at the store. Nike Members can also provide the email address or phone number used to place the order.",
  });

  const [filteredQueries, setFilteredQueries] = useState(allQueries);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredQueries(allQueries);
    } else {
      const filtered = {};
      const lowercaseQuery = query.toLowerCase();
      for (const [question, answer] of Object.entries(allQueries)) {
        if (question.toLowerCase().includes(lowercaseQuery)) {
          filtered[question] = answer;
        }
      }
      setFilteredQueries(filtered);
    }
  }, [query, allQueries]);

  return (
    <div>
      <h2 className="text-center">Frequently asked questions</h2>
      <input type="text" className="input" style={{ width: "100%" }} placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
      {Object.keys(filteredQueries).map((question) => (
        <div className="m-10 | flex | flexCol" key={question}>
          <b>{question}</b>
          <code>{filteredQueries[question]}</code>
        </div>
      ))}
    </div>
  );
}
