file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindSecondarySpecialSchoolsPoOpenYearModule SHARED ${SOURCES})

target_include_directories(FindSecondarySpecialSchoolsPoOpenYearModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindSecondarySpecialSchoolsPoOpenYearModule sc-memory)

add_dependencies(FindSecondarySpecialSchoolsPoOpenYearModule sc-memory)

sc_codegen(FindSecondarySpecialSchoolsPoOpenYearModule ${CMAKE_CURRENT_LIST_DIR})
