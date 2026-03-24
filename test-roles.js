const url = "https://dovpgnydsnvxckbfpzfn.supabase.co/rest/v1/user_roles?select=*";
const token = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjEzN2E5MjAzLTdiNzAtNGIzYS1hNWM4LTIxY2M0MmY0N2IyMyIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2RvdnBnbnlkc252eGNrYmZwemZuLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI2NTJjODFiMy05ZDliLTRiZWUtOTFkNC1lYzI1NTNlNTlhOTYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzc0MzcwNDE0LCJpYXQiOjE3NzQzNjY4MTQsImVtYWlsIjoicm95LnRhbWFhbGxAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6InJveS50YW1hYWxsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6IjY1MmM4MWIzLTlkOWItNGJlZS05MWQ0LWVjMjU1M2U1OWE5NiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzc0MzY2ODE0fV0sInNlc3Npb25faWQiOiI3MDcyZjMyMi0zNDQzLTQzNjEtOWZhZi0zOWY0YmY2M2QyN2YiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.7bqDUUxEOmL0F-VibwY5nJZZ_jtFDlqVTAa-TppJT3nHL-A6-21U7cy48gChvnRfYQ7xNjPHNGL5IAlpNL-6cQ";
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvdnBnbnlkc252eGNrYmZwemZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MjI5ODgsImV4cCI6MjA4OTE5ODk4OH0.2XXCanwHyubDmToLA8OIU4IHWZl0XNbGtpKWFRtta5I";

async function run() {
  const res = await fetch(url, {
    headers: {
      "apikey": apiKey,
      "Authorization": `Bearer ${token}`
    }
  });

  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Body:", text);
}

run();
