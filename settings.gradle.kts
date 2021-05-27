rootProject.name = "znake-arena"

includeTeam("znake-starter-springboot")

fun includeTeam(teamName: String) {
    include(":$teamName")
    project(":$teamName").projectDir = File("teams/${teamName}")
}
