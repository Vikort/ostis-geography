file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchNationalTheatersModule SHARED ${SOURCES})

target_include_directories(SearchNationalTheatersModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchNationalTheatersModule sc-memory)

add_dependencies(SearchNationalTheatersModule sc-memory)

sc_codegen(SearchNationalTheatersModule ${CMAKE_CURRENT_LIST_DIR})
