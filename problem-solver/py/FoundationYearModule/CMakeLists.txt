file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (FoundationYearModule SHARED ${SOURCES})

target_include_directories(FoundationYearModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(FoundationYearModule sc-memory)

add_dependencies(FoundationYearModule sc-memory)

sc_codegen(FoundationYearModule ${CMAKE_CURRENT_LIST_DIR})
