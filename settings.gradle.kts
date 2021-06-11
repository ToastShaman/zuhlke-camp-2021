rootProject.name = "znake-arena"

includeTeam("znake-starter-springboot")
includeTeam("znake-davidd")

fun includeTeam(teamName: String) {
    include(":$teamName")
    project(":$teamName").projectDir = File("teams/${teamName}")
}
