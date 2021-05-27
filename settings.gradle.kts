rootProject.name = "znake-arena"

includeTeam("znake-starter")

fun includeTeam(teamName: String) {
    include(":$teamName")
    project(":$teamName").projectDir = File("teams/${teamName}")
}
