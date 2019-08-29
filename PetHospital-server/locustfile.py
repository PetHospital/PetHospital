from locust import HttpLocust, TaskSet, task


class UserBehavior(TaskSet):
    token = None
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.login()


    def login(self):
        global token
        response = self.client.post("/user/login", {"username": "admin", "password": "qwertyuiop"})
        token = response.json()['token']

    @task(2)
    def index(self):
        self.client.get("/")

    @task(1)
    def profile(self):
        self.client.get("/user/profile", headers={'Authorization': 'Token {}'.format(token)})

    @task(1)
    def doc(self):
        self.client.get("/docs/")

    @task(2)
    def leaderboard(self):
        self.client.get("/test/leaderboard")

    @task(1)
    def disease_group(self):
        self.client.get('/disease/group')

    @task(2)
    def disease_image(self):
        self.client.get('/disease/images')

    @task(2)
    def disease_video(self):
        self.client.get('/disease/video')

    @task(5)
    def exam(self):
        self.client.get("/test/exam/1")

    @task(5)
    def exam_list(self):
        self.client.get("/test/exam-list")

    @task(5)
    def exercise(self):
        self.client.get("/test/exercise/low")

    @task(5)
    def search(self):
        self.client.get('/test/search/的')

    @task(5)
    def error(self):
        self.client.get('/test/error', headers={'Authorization': 'Token {}'.format(token)})

    @task(5)
    def history(self):
        self.client.get('/test/history', headers={'Authorization': 'Token {}'.format(token)})


class WebsiteUser(HttpLocust):
    # host = 'http://115.159.143.108'
    host = 'http://127.0.0.1:8000'

    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000
