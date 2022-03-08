file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindSecondarySpecialSchoolsPoCityModule SHARED ${SOURCES})

target_include_directories(FindSecondarySpecialSchoolsPoCityModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindSecondarySpecialSchoolsPoCityModule sc-memory)

add_dependencies(FindSecondarySpecialSchoolsPoCityModule sc-memory)

sc_codegen(FindSecondarySpecialSchoolsPoCityModule ${CMAKE_CURRENT_LIST_DIR})
