import axios from "axios";

const { PORT } = process.env;
const API_BASE_URL = `http://localhost:${PORT}`;

interface Comment {
  id: string;
  authorId: string;
  videoId: string;
  content: string;
  parentId?: string;
}

interface User {
  id: string;
  nickname: string;
  email: string;
}

interface Video {
  id: string;
  url: string;
  title: string;
  description: string;
  authorId: string;
}

//////////////////////////////////////////////////////////////////////////////////////
//User GET
async function testUsersEndpointGet() {
  try {
    // GET /users/
    let response = await axios.get<User[]>(`${API_BASE_URL}/users/`);
    console.log("GET /users/", response.data);

    // GET /users/id/:id
    response = await axios.get<User>(`${API_BASE_URL}/users/id/1`);
    console.log("GET /users/id/:id", response.data);

    // GET /users/nick/:nick
    response = await axios.get<User>(`${API_BASE_URL}/users/nick/dIvanov`);
    console.log("GET /users/nick/:nick", response.data);

    // GET /users/email/:email
    response = await axios.get<User>(
      `${API_BASE_URL}/users/email/dmitri.ivanov@nerv.net`
    );
    console.log("GET /users/email/:email", response.data);
  } catch (error) {
    console.error("Error testing GET users endpoints:", error);
  }
}

//User POST
async function testUsersEndpointPost() {
  try {
    const num = randomIntFromInterval(1111, 99999);
    // POST /users/
    let response = await axios.post<User>(`${API_BASE_URL}/users/`, {
      nickname: `newUser${num}`,
      email: `newuser${num}@example.com`,
    });
    console.log("POST /users/", response.data);
  } catch (error) {
    console.error("Error testing POST users endpoints:", error);
  }
}

//User PUT
async function testUsersEndpointPut() {
  try {
    // PUT /users/id/:id
    let response = await axios.put<User>(`${API_BASE_URL}/users/id/1`, {
      email: "dmitri.ivanov@nerv.net",
      nick: "updateduser",
      fullName: "Updated User",
      admin: true,
    });
    console.log("PUT /users/id/:id", response.data);

    // PUT /users/nick/:nick
    response = await axios.put<User>(`${API_BASE_URL}/users/nick/dIvanov`, {
      email: "dmitri.ivanov@nerv.net",
      nick: "dIvanov2",
      fullName: "Dmitri Ivanov",
      admin: true,
    });
    console.log("PUT /users/nick/:nick", response.data);
  } catch (error) {
    console.error("Error testing PUT users endpoints:", error);
  }
}

//User Delete
async function testUsersEndpointDelete() {
  try {
    // DELETE /users/id/:id
    let response = await axios.delete(`${API_BASE_URL}/users/id/1`);
    console.log("DELETE /users/id/:id", response.data);

    // DELETE /users/nick/:nick
    response = await axios.delete(`${API_BASE_URL}/users/nick/nickname`);
    console.log("DELETE /users/nick/:nick", response.data);
  } catch (error) {
    console.error("Error testing Delete users endpoints:", error);
  }
}

//User test
testUsersEndpointGet();
testUsersEndpointPost();
testUsersEndpointPut();
testUsersEndpointDelete();

//////////////////////////////////////////////////////////////////////////////////////
//Video Test
async function testVideosEndpointGet() {
  try {
    // GET /videos/
    let response = await axios.get<Video[]>(`${API_BASE_URL}/videos/`);
    console.log("GET /videos/", response.data);

    // GET /videos/author/id/:id
    response = await axios.get<Video[]>(`${API_BASE_URL}/videos/author/id/10`);
    console.log("GET /videos/author/id/:id", response.data);

    // GET /videos/author/nick/:nick
    response = await axios.get<Video[]>(
      `${API_BASE_URL}/videos/author/nick/dIvanov`
    );
    console.log("GET /videos/author/nick/:nick", response.data);

    // GET /videos/author/email/:email
    response = await axios.get<Video[]>(
      `${API_BASE_URL}/videos/author/email/dmitri.ivanov@nerv.net`
    );
    console.log("GET /videos/author/email/:email", response.data);

    // GET /videos/id/:id
    response = await axios.get<Video>(`${API_BASE_URL}/videos/id/10`);
    console.log("GET /videos/id/:id", response.data);

    // GET /videos/url/:url
    response = await axios.get<Video>(`${API_BASE_URL}/videos/url/Lo2qQmj0_h4`);
    console.log("GET /videos/url/:url", response.data);

    // GET /videos/search?title
    response = await axios.get<Video[]>(
      `${API_BASE_URL}/videos/search?title=shook`
    );
    console.log("GET /videos/search?title", response.data);

    // GET /videos/search?description
    response = await axios.get<Video[]>(
      `${API_BASE_URL}/videos/search?description=alternative%20rock`
    );
    console.log("GET /videos/search?description", response.data);
  } catch (error) {
    console.error("Error testing GET videos endpoints:", error);
  }
}

//Video POST
async function testVideosEndpointPost() {
  try {
    const num = randomIntFromInterval(0, 9);

    // POST /videos/
    let response = await axios.post<Video>(`${API_BASE_URL}/videos/`, {
      url: `V${num}bFr${num}SWP${num}I`,
      title: "Somewhere",
      description: "He just went somewhere... over the rainbow",
      authorId: "1",
    });
    console.log("POST /videos/", response.data);
  } catch (error) {
    console.error("Error testing PUT videos endpoints:", error);
  }
}

//Video PUT
async function testVideosEndpointPut() {
  try {
    const num = randomIntFromInterval(0, 9);

    // PUT /videos/id/:id
    let response = await axios.put<Video>(`${API_BASE_URL}/videos/id/33`, {
      title: "Updated Video Title",
      url: `E${num}rFr${num}STP${num}I`,
      description: `OFFICIAL ${num}`,
    });
    console.log("PUT /videos/id/:id", response.data);

    // PUT /videos/url/:url
    response = await axios.put<Video>(
      `${API_BASE_URL}/videos/url/9jf3X9Yz0mY`,
      {
        title: "Updated Video Title",
        url: `9jf3X9Yz0mY`,
        description: `OFFICIAL ${num}`,
      }
    );
    console.log("PUT /videos/url/:url", response.data);

    // PUT /videos/views/:id
    response = await axios.put<Video>(`${API_BASE_URL}/videos/views/33`);
    console.log("PUT /videos/views/:id", response.data);
  } catch (error) {
    console.error("Error testing PUT videos endpoints:", error);
  }
}

//Video DELETE
async function testVideosEndpointDelete() {
  try {
    // DELETE /videos/id/:id
    let response = await axios.delete(`${API_BASE_URL}/videos/id/44`);
    console.log("DELETE /videos/id/:id", response.data);

    // DELETE /videos/url/:url
    response = await axios.delete(`${API_BASE_URL}/videos/url/FiUNDeuBbi8`);
    console.log("DELETE /videos/url/:url", response.data);

    // DELETE /videos/author/:id
    response = await axios.delete(`${API_BASE_URL}/videos/author/48`);
    console.log("DELETE /videos/author/:id", response.data);

    console.log("PUT /videos/views/:id", response.data);
  } catch (error) {
    console.error("Error testing DELETE videos endpoints:", error);
  }
}

//Video Test
testVideosEndpointGet();
testVideosEndpointPost();
testVideosEndpointPut();
testVideosEndpointDelete();

//////////////////////////////////////////////////////////////////////////////////////
//Comments Test
async function testCommentsEndpointGet() {
  try {
    // GET /comments/
    let response = await axios.get<Comment[]>(`${API_BASE_URL}/comments/`);
    console.log("GET /comments/", response.data);

    // GET /comments/:id
    response = await axios.get<Comment>(`${API_BASE_URL}/comments/22`);
    console.log("GET /comments/:id", response.data);

    // GET /comments/author/id/:id
    response = await axios.get<Comment[]>(
      `${API_BASE_URL}/comments/author/id/22`
    );
    console.log("GET /comments/author/id/:id", response.data);

    // GET /comments/author/nick/:nick
    response = await axios.get<Comment[]>(
      `${API_BASE_URL}/comments/author/nick/aAnderson`
    );
    console.log("GET /comments/author/nick/:nick", response.data);

    // GET /comments/author/email/:email
    response = await axios.get<Comment[]>(
      `${API_BASE_URL}/comments/author/email/toby.york@nerv.net`
    );
    console.log("GET /comments/author/email/:email", response.data);

    // GET /comments/video/id/:id
    response = await axios.get<Comment[]>(
      `${API_BASE_URL}/comments/video/id/16`
    );
    console.log("GET /comments/video/id/:id", response.data);

    // GET /comments/video/url/:url
    response = await axios.get<Comment[]>(
      `${API_BASE_URL}/comments/video/url/4D2qcbu26gs`
    );
    console.log("GET /comments/video/url/:url", response.data);

    // GET /comments/video/:videoId/author/:authorId
    response = await axios.get<Comment[]>(
      `${API_BASE_URL}/comments/video/1/author/18`
    );
    console.log("GET /comments/video/:videoId/author/:authorId", response.data);

    // GET /comments/parent/:id
    response = await axios.get<Comment[]>(`${API_BASE_URL}/comments/parent/1`);
    console.log("GET /comments/parent/:id", response.data);
  } catch (error) {
    console.error("Error testing Get comments endpoints:", error);
  }
}

//Comments POST
async function testCommentsEndpointPost() {
  try {
    const num = randomIntFromInterval(0, 9);

    // POST /comments/
    let response = await axios.post<Comment>(`${API_BASE_URL}/comments/`, {
      authorId: "10",
      videoId: "10",
      text: "This is a comment created",
    });
    console.log("POST /comments/", response.data);
  } catch (error) {
    console.error("Error testing POST comments endpoints:", error);
  }
}

//Comments POST
async function testCommentsEndpointPut() {
  try {
    // PUT /comments/id/:id
    let response = await axios.put<Comment>(`${API_BASE_URL}/comments/id/5`, {
      text: "This is an updated comment",
    });
    console.log("PUT /comments/id/:id", response.data);

    // PUT /comments/video/:videoId/author/:authorId
    response = await axios.put<Comment[]>(
      `${API_BASE_URL}/comments/video/3/author/5`,
      {
        text: "This is an updated comment for video 3 by author 5",
      }
    );
    console.log("PUT /comments/video/:videoId/author/:authorId", response.data);
  } catch (error) {
    console.error("Error testing PUT comments endpoints:", error);
  }
}

//Comments DELETE
async function testCommentsEndpointDelete() {
  try {
    // DELETE /comments/id/:id
    let response = await axios.delete(`${API_BASE_URL}/comments/id/41`);
    console.log("DELETE /comments/id/:id", response.data);

    // DELETE /comments/video/:id
    response = await axios.delete(`${API_BASE_URL}/comments/video/41`);
    console.log("DELETE /comments/video/:id", response.data);

    // DELETE /comments/author/:id
    response = await axios.delete(`${API_BASE_URL}/comments/author/41`);
    console.log("DELETE /comments/author/:id", response.data);
  } catch (error) {
    console.error("Error testing DELETE comments endpoints:", error);
  }
}

testCommentsEndpointGet();
testCommentsEndpointPost();
testCommentsEndpointPut();
testCommentsEndpointDelete();

//
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
