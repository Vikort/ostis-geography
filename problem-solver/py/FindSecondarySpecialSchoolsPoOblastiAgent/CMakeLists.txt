file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FindSecondarySpecialSchoolsPoOblastiModule SHARED ${SOURCES})

target_include_directories(FindSecondarySpecialSchoolsPoOblastiModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FindSecondarySpecialSchoolsPoOblastiModule sc-memory)

add_dependencies(FindSecondarySpecialSchoolsPoOblastiModule sc-memory)

sc_codegen(FindSecondarySpecialSchoolsPoOblastiModule ${CMAKE_CURRENT_LIST_DIR})
