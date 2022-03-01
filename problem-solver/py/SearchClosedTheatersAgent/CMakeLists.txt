file(GLOB_RECURSE SOURCES "*.cpp" "*.hpp")

add_library (SearchClosedTheatersModule SHARED ${SOURCES})

target_include_directories(SearchClosedTheatersModule PRIVATE ${SC_MEMORY_SRC})
target_link_libraries(SearchClosedTheatersModule sc-memory)

add_dependencies(SearchClosedTheatersModule sc-memory)

sc_codegen(SearchClosedTheatersModule ${CMAKE_CURRENT_LIST_DIR})
