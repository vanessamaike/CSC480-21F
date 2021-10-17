<Container
        maxWidth="lg"
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Grid container spacing={1} direction="row"> 
          <Grid item >
            <Card
              variant="outlined"
              sx={{
                width: "30%",
                overflow: "hidden",
                p: 1,
                border: "3px solid #cfe1ff",
                borderRadius: "10px",
              }}
            >
              <CardHeader
                title={
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="h6"
                    component="div"
                  >
                    View Courses
                  </Typography>
                }
              ></CardHeader>
              <CardContent>
                <Stack spacing={2}>
                  <CourseBar></CourseBar>
                  <CourseBar></CourseBar>
                  <CourseBar></CourseBar>
                  <CourseBar></CourseBar>
                  <CreateNewCourseButton></CreateNewCourseButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sx={{  display: "flex", flexDirection: "column" }}>
            <Card
              variant="outlined"
              sx={{
                overflow: "hidden",
                p: 1,
                border: "3px solid #cfe1ff",
                borderRadius: "10px",
              }}
            >
              <CardHeader
                title={
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="h6"
                    component="div"
                  >
                    Results to Review
                  </Typography>
                }
              ></CardHeader>
              <CardContent sx={{ paddingTop: 0 }}>
                <Stack>
                  <ReviewBar></ReviewBar>
                  <ReviewBar></ReviewBar>
                </Stack>
              </CardContent>
            </Card>
            <Card
              variant="outlined"
              sx={{
                overflow: "hidden",
                p: 1,
                border: "3px solid #cfe1ff",
                borderRadius: "10px",
              }}
            >
              <CardHeader
                title={
                  <Typography
                    style={{ fontWeight: "600" }}
                    variant="h6"
                    component="div"
                  >
                    Results to Review
                  </Typography>
                }
              ></CardHeader>
              <CardContent sx={{ paddingTop: 0 }}>
                <Stack>
                  <ReviewBar></ReviewBar>
                  <ReviewBar></ReviewBar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>